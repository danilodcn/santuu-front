<template>
  <div class="content">
    <div class="container-send">
      <img class="carraca" src="{% static 'assets/carraca.svg' %}" />
      <li v-if="biker.bike_event"></li>
      <p class="title-comunicate">Você já possui confirmação em outro evento</p>
      <div class="content-send">
        <p class="desc-comunicate">
          <strong>{{ biker.bike_event.name }}</strong>
        </p>
        <p class="desc-comunicate">
          que vai acontecer no dia
          <strong>{{ bike_event.initial_date }}</strong>
        </p>
        <p class="desc-comunicate">Ao chegar no local, faça Check-in</p>
      </div>
      <form method="GET" action="{% url 'bike_event_scheduled' %}">
        <button type="submit" class="btn-certificate btn-check-user">
          Meus Eventos
        </button>
      </form>
      <li v-else-if></li>
      <p class="title-comunicate">
        Deseja Confirmar, sua presença nesse evento ?
      </p>
      <div class="content-send">
        <p class="desc-comunicate">
          <strong>{{ bike_event.name }}</strong>
        </p>
        <p class="desc-comunicate">
          que vai acontecer no dia
          <strong>{{ bike_event.initial_date }}</strong>
        </p>
      </div>
      <form
        method="POST"
        action="{% url 'bike_event_available_view' pk=bike_event.id %}"
      >
        <button type="submit" class="btn-certificate btn-check-user">
          Quero participar
        </button>
      </form>
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
    bike_event : {
    name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
    initial_date: "20-02-2000",
    final_date: "20-02-2030",
    poster: {
      url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
    },
    description: "2022 MERCEDES-BENZ UCI MOUNTAIN BIKE WORLD CU
  }
}
</script>
