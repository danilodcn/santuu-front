<template>
  <v-container class="pt-12 px-10">
    <v-col cols="12" class="ma-0"> Acompanhe o seu chamado </v-col>
    <v-row class="ma-0 timeline d-flex align-center col-12">
      <v-timeline class="pa-0">
        <v-timeline-item
          v-for="(x, i) in currentStatus"
          :key="i"
          :color="getColorByStatus(x.status)"
          :id="`timeline-item-${x.position}`"
          :class="{ 'pb-0': i == currentStatus.length - 1 }"
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
    <v-row class="col-12 my-0 px-6">
      <p class="body-2 ma-0">Mecânico: Fulano de Tal</p>
      <p class="body-2 ma-0">Tempo estimado de chegada: X min</p>
    </v-row>
    <v-card-actions class="back-forward mt-4 mb-10">
      <v-row justify="space-between" class="mx-1">
        <v-btn color="#FF5252" class="white--text">Cancelar</v-btn>
        <v-btn color="#CCCB00" class="button white--text">Chat</v-btn>
      </v-row>
    </v-card-actions>
    <loading-tips
      :type="user_types.cyclist"
      :time_showing_ms="5000"
      class="mx-1 text-justify"
    ></loading-tips>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";
import {
  status,
  status_finished,
  user_types,
  STATUS_NUMBER,
} from "@/utils/sos_timeline";
import LoadingTips from "@/components/LoadingTips.vue";

@Component({
  components: { EventCard, LoadingTips },
})
export default class Available extends Vue {
  order_data = {} as IOrder;
  order_id = -1;

  user_types = user_types;

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

  get currentStatus() {
    if (!("id" in this.order_data)) {
      return [
        {
          status_text: "Carregando",
          status: [-1],
          position: 0,
        },
      ];
    }

    if (this.order_data.service_status == STATUS_NUMBER.FINISHED) {
      return this.status_finished;
    }
    return this.status;
  }

  get currentColor() {
    if (this.order_data == ({} as IOrder)) {
      return this.colors;
    }
    if (this.order_data.service_status == STATUS_NUMBER.FINISHED) {
      return this.colors_finished;
    }
    return this.colors;
  }

  findCommonElements(arr1: any[], arr2: any[]) {
    return arr1.some((item) => arr2.includes(item));
  }

  getColorByStatus(status: number[]) {
    if (!("id" in this.order_data)) {
      return;
    }

    const current_status = this.currentStatus.find((x) =>
      x.status.includes(this.order_data.service_status)
    );
    const given_status = this.currentStatus.find((x) =>
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

  async getOpenOrder() {
    const response = await sosService.getOpenOrder();
    if (!response.error) {
      this.order_data = response;
    } else {
      return;
    }
    this.order_id = this.order_data.id;
    setTimeout(this.refreshingTimeline, 5000);
  }
  async getOrder() {
    this.order_data = await sosService.getOrder(this.order_id);
  }

  refreshingTimeline() {
    this.$forceUpdate();
    setInterval(this.getOrder, 5000);
  }
}
</script>

<style lang="scss">
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
</style>
