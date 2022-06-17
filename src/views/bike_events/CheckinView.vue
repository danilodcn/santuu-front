<template>
  <v-container class="content-container">
    <v-card class="px-0 px-md-5 py-10 event-info">
      <h3 class="title-content">{{ bike_event.name }}</h3>
      <v-row justify="start">
        <v-col class="col-12 col-md-6 pl-15">
          <strong>Data Inicial:</strong>
          <p>{{ bike_event.initial_date }}</p>
        </v-col>
        <v-col class="col-12 col-md-6 pl-15">
          <strong>Data Final:</strong>
          <p>{{ bike_event.final_date }}</p>
        </v-col>
        <v-col class="col-12 col-md-6 pl-15">
          <strong>Descrição do Evento:</strong>
          <p>{{ bike_event.description }}</p>
        </v-col>
        <!-- <v-col cols="6" class="pl-15">
          <a href="{% url 'bike_event_available_view' pk=bike_event.id %}">
            <img class="event_image" :src="bike_event.poster.url" />
          </a>
        </v-col> -->
      </v-row>
    </v-card>
    <v-card class="px-0 px-md-5 py-10 event-checkin">
      <h3 class="title-content">Fazer Check-in no evento</h3>
      <v-form class="form">
        <v-row class="pa-0 px-10 px-md-10">
          <div class="item col-12">
            <div class="col-12 col-md-6 sub-item">
              <v-select label="Marca"></v-select>
              <info-dialog
                text="Qual materia do quadro da sua bike?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12">
            <div class="col-12 col-md-6 sub-item">
              <v-select label="Categoria"></v-select>
              <info-dialog
                text="Qual materia do quadro da sua bike?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12">
            <div class="col-12 col-md-6 sub-item">
              <v-text-field label="Modelo"></v-text-field>
              <info-dialog
                text="Qual materia do quadro da sua bike?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12">
            <div class="col-12 col-md-6 sub-item">
              <v-file-input label="Foto do lado direito"></v-file-input>
              <info-dialog
                text="Qual materia do quadro da sua bike?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12">
            <div class="col-12 col-md-6 sub-item">
              <v-file-input label="Foto do lado direito"></v-file-input>
              <info-dialog
                text="Qual materia do quadro da sua bike?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="back-forward">
        <v-row justify="space-between" class="mx-5">
          <v-btn text>Voltar</v-btn>
          <v-btn text class="button">Fazer Check-in</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
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
  bike_event = {
    name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
    initial_date: "20-02-2000",
    final_date: "20-02-2030",
    poster: {
      url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
    },
    description: "2022 MERCEDES-BENZ UCI MOUNTAIN BIKE WORLD CUP",
  };
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.form {
  margin-bottom: 40px;
}
.back-forward {
  margin-top: 30px;
}
.button {
  color: $main-dark-color !important;
}
.container {
  margin: auto;
}
.item {
  padding-top: 0px;
  padding-bottom: 0px;
}
.sub-item {
  display: flex;
}
.event-info p {
  margin-top: 10px;
  font-size: 0.8em;
}
.title-content {
  font-weight: 500;
  color: $main-dark-color;
  margin: 0px auto 20px 45px;
}
.event_image {
  transform: translate(-20px, -20px);
  max-width: 200px;
  padding: 10px;
  margin-top: auto;
}
.item::v-deep .info-button {
  margin-top: 0px;
}
.v-icon {
  color: $main-dark-color !important;
}
.v-card {
  margin: auto;
  margin-bottom: 30px;
  max-width: 1080px;
}
</style>
