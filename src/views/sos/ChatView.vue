<template>
  <v-container class="px-10 container elevation-xs-0 elevation-md-10">
    <v-col class="col-xs-10 offset-xs-1 col-md-8 offset-md-2 mt-xs-0 mt-md-4">
      <p class="pa-0 ma-0">Chat - {{ order_data.mechanic_name }}</p>
      <p class="pa-0 ma-0 body-2">
        Chamado #{{ leftPad(order_data.id * 33, 8, "0") }}00
      </p>
    </v-col>
    <div style="height: 400px"></div>
    <chat-sender
      class="col-xs-12 offset-xs-0 col-md-8 offset-md-2"
    ></chat-sender>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";
import { leftPad } from "@/utils/utils";
import {
  status,
  status_finished,
  user_types,
  STATUS_NUMBER,
} from "@/utils/sos_timeline";
import ChatSender from "@/components/ChatSender.vue";

@Component({
  components: { EventCard, ChatSender },
})
export default class Available extends Vue {
  order_data = {} as IOrder;
  order_id = -1;

  leftPad = leftPad;
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
@media (min-width: 768px) {
  .container {
    background: #fff;
    max-width: 600px;
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
</style>
