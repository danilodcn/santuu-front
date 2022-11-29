<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-row>
      <v-timeline>
        <v-timeline-item
          v-for="(x, i) in status"
          :key="i"
          :color="getColorByStatus(x.status)"
          :id="`timeline-item-${x.status}`"
          small
        >
          {{ `${x.status_text}` }}
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";

@Component({
  components: { EventCard },
})
export default class Available extends Vue {
  order_data = {} as IOrder;

  colors = {
    past: "#DDDDB3",
    current: "#B8B703",
    future: "#989898",
  };

  status = [
    {
      status_text: "Aguardando mecânico",
      status: 1,
      position: 0,
    },
    {
      status_text: "Mecânico a caminho",
      status: 2,
      position: 1,
    },
    {
      status_text: "Mecânico chegou no local",
      status: 3,
      position: 2,
    },
  ].sort((a, b) => {
    return a.position > b.position ? 1 : -1;
  });

  getColorByStatus(status: number) {
    if (this.order_data == null) {
      return;
    }

    const current_status = this.status.find(
      (x) => x.status == this.order_data.service_status
    );
    const given_status = this.status.find((x) => x.status == status);

    const current_position = current_status?.position || 0;
    const given_position = given_status?.position || 0;
    if (current_position > given_position) {
      return this.colors.past;
    } else if (current_position == given_position) {
      (
        document.getElementById(`timeline-item-${current_status?.status}`)
          ?.lastChild?.lastChild?.lastChild as HTMLElement
      ).classList.add("blink");
      return this.colors.current;
    } else {
      return this.colors.future;
    }
  }

  created() {
    this.getOpenOrder();
    this.refreshingTimeline();
  }

  async getOpenOrder() {
    this.order_data = await sosService.getOpenOrder();
  }

  refreshingTimeline() {
    setInterval(this.getOpenOrder, 2000);
  }
}
</script>

<style lang="scss">
@keyframes blinking {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(184, 183, 3, 1);
  }
}
.blink {
  -webkit-animation-name: blinking;
  -webkit-animation-duration: 1s;
  -webkit-animation-direction: alternate;
  -webkit-animation-iteration-count: infinite;
}
</style>
