<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-row>
      <h4 class="title-content">{{ title }}</h4>
    </v-row>
    <div class="events">
      <v-row>
        <template v-for="(event, i) in events">
          <v-col cols="12" sm="6" md="4" v-if="event" :key="`event-${i}`">
            <event-card :data="event" />
          </v-col>
        </template>
        <h4 class="no-event" v-if="events.length < 1">
          Nenhum evento disponível
        </h4>
      </v-row>
    </div>
    <v-divider class="mt-10"></v-divider>
    <v-row justify="space-between" class="mt-10 mx-4">
      <v-btn text @click="$router.push({ path: '/bike-events/' })"
        >Voltar</v-btn
      >
      <v-btn text class="button" disabled>Avançar</v-btn>
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
  type = this.$route.query.type as string;

  title =
    {
      going: "Eventos Disponíveis",
      finished: "Eventos Finalizados",
      my_events: "Meus Eventos",
    }[this.type] || "Todos Eventos";

  async getEvents() {
    let events = await eventService.getEvent({ type: this.type });
    events = events.map((e: IEvent) => {
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
@import "@/scss/main.scss";
.events {
  min-height: 400px;
}
.button {
  color: $main-dark-color !important;
}
.no-event {
  font-weight: 200;
  color: $main-dark-color;
  margin: 40px auto 0px 40px;
}
.title-content {
  font-weight: 500 !important;
  color: $main-dark-color;
  margin: 5px auto 30px 10px;
}
.event_image {
  padding: 10px;
  margin-top: auto;
}
.item-proposal {
  font-size: 0.8em;
}
@media (min-width: 960px) {
  .title-content {
    font-size: 1.5em;
  }
}
</style>
