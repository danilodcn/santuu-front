<template>
  <v-container class="px-10 container elevation-xs-0 elevation-md-10">
    <v-col class="col-xs-10 offset-xs-1 col-md-6 offset-md-3 mt-8">
      Acompanhe o seu chamado
    </v-col>
    <v-row class="ma-0 timeline d-flex align-center col-12">
      <v-timeline class="pa-0 col-xs-12 offset-xs-0 col-md-6 offset-md-3">
        <v-timeline-item
          v-for="(x, i) in current_status"
          :key="i"
          :color="getColorByStatus(x.status)"
          :id="`timeline-item-${x.position}`"
          :class="{ 'pb-0': i == current_status.length - 1 }"
          small
        >
          <p
            class="body-2 font-weight-medium"
            :style="`color: ${getColorByStatus(x.status)}`"
          >
            {{ `${x.status_text}` }}
          </p>
        </v-timeline-item>
      </v-timeline>
    </v-row>
    <v-row
      class="col-xs-12 offset-xs-0 col-md-6 offset-md-3 my-0 px-6"
      v-if="order_data.mechanic"
    >
      <p class="body-2 col-12 pa-0 ma-0">
        Mecânico: {{ order_data.mechanic_name }}
      </p>
    </v-row>
    <v-card-actions
      class="back-forward mt-4 mb-10 col-xs-12 offset-xs-0 col-md-6 offset-md-3"
    >
      <v-row justify="space-between" class="mx-1">
        <v-btn
          :disabled="!canCancel"
          color="#FF5252"
          class="white--text"
          @click="cancel"
          >Cancelar</v-btn
        >
        <v-badge
          color="pink"
          dot
          offset-x="12"
          offset-y="12"
          :value="has_new_messages"
          class="msg-blink"
        >
          <v-btn color="#CCCB00" class="button white--text" @click="chat" dot>
            Chat
          </v-btn>
        </v-badge>
      </v-row>
    </v-card-actions>
    <loading-tips
      :type="user_types.cyclist"
      :time_showing_ms="5000"
      class="text-justify col-xs-10 offset-xs-1 col-md-6 offset-md-3 mb-xs-0 mb-md-2"
    ></loading-tips>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";
import {
  status,
  status_finished,
  user_types,
  STATUS_NUMBER,
  order_status_choices,
} from "@/utils/sos";
import LoadingTips from "@/components/LoadingTips.vue";
import { BaseComponent } from "@/utils/component";

@Component({
  components: { EventCard, LoadingTips },
})
export default class Available extends BaseComponent {
  order_data = {} as IOrder;
  order_id = -1;

  user_types = user_types;

  current_status = [
    {
      status_text: "Carregando",
      status: [-1],
      position: 0,
    },
  ];
  status = status;
  status_finished = status_finished;

  colors = {
    past: "#DDDDB3",
    current: "#B8B703",
    future: "#989898",
  };
  colors_finished = {
    past: "#DDDDB3",
    current: "#FF5252",
    future: "#989898",
  };

  has_new_messages = false;

  get currentColor() {
    if (this.order_data == ({} as IOrder)) {
      return this.colors;
    }
    if (this.order_data.service_status == STATUS_NUMBER.FINISHED) {
      return this.colors_finished;
    }
    return this.colors;
  }

  sendToBegin() {
    this.$router.push({ path: "/sos/form/" });
  }

  async cancel() {
    this.changeLoading(true);
    const response = await sosService.updateStatus({
      order_id: this.order_id,
      status: order_status_choices.canceled,
    });
    if (!response.error) {
      this.changeLoading(false);
      this.order_data = response;
      this.changeMainDialog({
        active: true,
        bntClose: false,
        msg: "Seu chamado foi cancelado, você será levado para página inicial",
        persistent: true,
        btnOkOnly: true,
        msgOk: "OK",
        title: "Cancelado",
        ident: false,
        afterFunction: this.sendToBegin,
      });
    } else {
      return;
    }
  }
  get canCancel() {
    return [
      STATUS_NUMBER.OPEN,
      STATUS_NUMBER.PROGRESS,
      STATUS_NUMBER.TRAVEL,
    ].includes(this.order_data.service_status);
  }

  findCommonElements(arr1: any[], arr2: any[]) {
    return arr1.some((item) => arr2.includes(item));
  }

  getColorByStatus(status: number[]) {
    if (!("id" in this.order_data)) {
      return;
    }

    const current_status = this.current_status.find((x: any) =>
      x.status.includes(this.order_data.service_status)
    );
    const given_status = this.current_status.find((x: any) =>
      this.findCommonElements(x.status, status)
    );

    const current_position = current_status?.position || 0;
    const given_position = given_status?.position || 0;
    if (current_position > given_position) {
      return this.currentColor.past;
    } else if (current_position == given_position) {
      this.clearBlink();
      if (this.order_data.service_status != STATUS_NUMBER.FINISHED) {
        this.setToBlink(current_position);
      }
      return this.currentColor.current;
    } else {
      return this.currentColor.future;
    }
  }

  clearBlink() {
    Array.from(document.querySelectorAll(".blink")).forEach((el) =>
      el.classList.remove("blink")
    );
  }
  setToBlink(position: number) {
    (
      document.getElementById(`timeline-item-${position}`)?.lastChild?.lastChild
        ?.lastChild as HTMLElement
    ).classList.add("blink");
  }

  created() {
    this.getOpenOrder();
  }

  chat() {
    this.$router.push({ path: "/sos/chat/" });
  }

  setStatus() {
    if (this.order_data.service_status == STATUS_NUMBER.FINISHED) {
      this.current_status = this.status_finished;
    } else {
      this.current_status = this.status;
    }
  }

  async getOpenOrder() {
    const response = await sosService.getOpenOrder();
    if (!response.error) {
      this.order_data = response;
      this.setStatus();
    } else {
      return;
    }
    this.order_id = this.order_data.id;
    setTimeout(this.refreshingTimeline, 5000);
  }
  async getOrder() {
    this.order_data = await sosService.getOrder(this.order_id);
  }

  async hasNewMsg() {
    const response = await sosService.hasNewMessages(this.order_id);
    this.has_new_messages = response.has_new_messages;
  }

  interval_1!: any;
  interval_2!: any;

  refreshingTimeline() {
    this.$forceUpdate();
    setInterval(this.hasNewMsg, 5000);
    setInterval(this.getOrder, 5000);
  }
  beforeDestroy() {
    clearInterval(this.interval_1);
    clearInterval(this.interval_2);
  }
}
</script>

<style lang="scss">
@media (min-width: 768px) {
  .container {
    background: #fff;
    max-width: 800px;
    margin-top: 30px;
    border-radius: 10px;
  }
}
@keyframes blinking {
  from {
    background-color: #ddddb3;
  }
  to {
    background-color: #b8b703;
  }
}
.blink {
  -webkit-animation-name: blinking;
  animation-name: blinking;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.timeline {
  min-height: 50vh;
}

@keyframes msg-blinker {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.msg-blink .v-badge__badge {
  -webkit-animation-name: msg-blinker;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  -webkit-animation-duration: 1.7s;
}
</style>
