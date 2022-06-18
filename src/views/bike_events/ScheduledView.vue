<template>
  <div class="content-container">
    <h3 class="title-content">Meus Eventos</h3>
    <div class="card-item-container">
      <li v-if="bike_events"></li>
      <ul>
        <template v-for="bike_event in bike_events">
          <li class="item-proposal">
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
          </li>
          <li v-if="biker.has_checkin">
            <strong>Protocolo de Check-in:</strong>
            <p>{{ biker.protocol }}</p>
            <div class="info-proposal">
              <div class="proposal-program">
                {% if bike_event.poster %}
                <img
                  src="{{bike_event.poster.url}}"
                  width="80px"
                  height="60px"
                />
              </div>
            </div>
          </li>
          >
        </template>
      </ul>
      {% else %}
      <span>
        Para fazer o seu check-in escolha um evento
        <a
          onclick="document.location.href='/dashboard/bike/events/available'"
          style="color: #cccb00; font-weight: 700; cursor: pointer"
          >clicando aqui.</a
        >
      </span>
    </div>
  </div>
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
  biker = {
    has_checkin: "True",
    bike_event: {
      name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
      initial_date: "20-02-2000",
      final_date: "20-02-2030",
      poster: {
        url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
      },
      description: "2022 MERCEDES-BENZ UCI MOUNTAIN BIKE WORLD",
    },
  };
}
</script>
