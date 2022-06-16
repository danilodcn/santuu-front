<template>
  <v-container class="content-container">
    <h3 class="title-content">Eventos Disponíveis</h3>
    <div class="card-item-container row justify-space-between">
      <template v-for="bike_event in bike_events">
        <v-card class="item-proposal col-5 ma-0 pa-0" :key="bike_event">
          <v-row class="mx-0">
            <div class="col-12 pa-0 ma-0">
              <a href="{% url 'bike_event_available_view' pk=bike_event.id %}">
                <img
                  class="event_image"
                  :src="bike_event.poster.url"
                  width="100%"
                />
              </a>
            </div>
            <div class="col-12 pa-0 ma-0">
              <strong>Nome:</strong>
              <p>
                {{ bike_event.name }}
              </p>
              <strong>Data de Inicio:</strong>
              <p>
                {{ bike_event.initial_date }}
              </p>
              <strong>Data de Final:</strong>
              <p>{{ bike_event.final_date }}</p>
            </div>
          </v-row>
        </v-card>
      </template>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Available extends Vue {
  bike_events = [
    {
      name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
      initial_date: "20-02-2000",
      final_date: "20-02-2030",
      poster: {
        url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
      },
    },
    {
      name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
      initial_date: "20-02-2000",
      final_date: "20-02-2030",
      poster: {
        url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
      },
    },
    {
      name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
      initial_date: "20-02-2000",
      final_date: "20-02-2030",
      poster: {
        url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
      },
    },
    {
      name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
      initial_date: "20-02-2000",
      final_date: "20-02-2030",
      poster: {
        url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
      },
    },
  ];
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
