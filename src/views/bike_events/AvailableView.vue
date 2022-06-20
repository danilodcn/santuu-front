<template>
  <v-container class="content-container">
    <h3 class="title-content">Eventos Disponíveis</h3>
    <v-row>
      <template v-for="(event, i) in events">
        <v-col cols="12" sm="6" md="4" v-if="event" :key="`event-${i}`">
          <event-card :data="event" />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { IEvent } from "@/types/events";
import { eventService } from "@/api/bikeEvents";

@Component({
  components: { EventCard },
})
export default class Available extends Vue {
  events: IEvent[] = [];

  async getEvents() {
    let events = await eventService.getEvent({ type: "going" });
    events = events.map((e) => {
      return { ...e, url: e.poster };
    });

    this.events = events;
  }

  handleEvents() {
    this.events = this.events.map((e) => {
      return { ...e, url: e.poster };
    });
  }

  created() {
    this.getEvents();
    // this.handleEvents();
  }
}
</script>

<style lang="scss" scoped>
.event_image {
  padding: 10px;
  margin-top: auto;
}
.item-proposal {
  font-size: 0.8em;
}
</style>
