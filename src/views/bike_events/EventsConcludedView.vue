<template>
  <v-container>
    <div class="content-container">
      <h3 class="title-content">Eventos Concluidos</h3>
      <div class="card-item-container">
        <ul>
          <template v-for="(bike_event, index) in bike_events">
            <li class="item-proposal" :key="index">
              <strong>Nome:</strong>
              <p>
                {{ bike_event }}
              </p>
              <strong>Data de Inicio:</strong>
              <p>
                {{ bike_event.initial_date }}
              </p>
              <strong>Data de Final:</strong>
              <p>{{ bike_event.final_date }}</p>
              <div class="info-proposal">
                <div class="proposal-program">
                  <li v-if="bike_event.poster">
                    <img
                      :src="bike_event.poster.url"
                      width="80px"
                      height="60px"
                    />
                  </li>
                </div>
              </div></li
          ></template>
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";

@Component({
  components: {
    InfoDialog,
  },
})
export default class Available extends Vue {
  bike = {
    brand: "Caloi",
    serial_number: "40028922",
    model: "Intel",
  };
  bike_event = {
    name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
    initial_date: "20-02-2000",
    final_date: "20-02-2030",
    poster: {
      url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
    },
    description: "2022 MERCEDES-BENZ UCI MOUNTAIN BIKE WORLD CUP",
  };
  sinister = {
    date: "30-02-2030",
  };
}
</script>
