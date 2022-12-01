<template>
  <v-form>
    <v-container class="content-container mt-10 mt-md-3 px-10">
      <v-row>
        <v-col cols="3" md="1">
          <v-icon large @click.prevent=""> mdi-chevron-left </v-icon>
        </v-col>
        <v-col cols="9" md="3" align-self="start">
          <h4 class="title-content">Criação de chamado</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card
              :class="{ 'on-hover': hover }"
              :elevation="hover ? 12 : 2"
              @click.prevent=""
            >
              <v-img
                lazy-src="https://cdn.pixabay.com/photo/2018/04/12/18/13/marker-3314279_960_720.png"
                max-height="150"
                max-width="352.53"
                src="https://cdn.pixabay.com/photo/2018/04/12/18/13/marker-3314279_960_720.png"
              ></v-img>
              <v-card-text class="mx-0">
                Clique aqui para ativar sua localização
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="cpf"
            label="CPF"
            v-mask="'###.###.###-##'"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="bike_brand"
            label="Marca da bike"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="bike_model"
            label="Modelo da bike"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :items="items"
            item-text="name"
            item-value="id"
            label="Tipo de serviço"
            dense
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="reference_point"
            label="Ponto de referência"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-file-input
            label="Imagem 1"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-file-input
            label="Imagem 2"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-file-input
            label="Imagem 3"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" offset-md="2">
          <v-btn color="primary"> Solicitar SOS </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { IEvent } from "@/types/events";

@Component({
  components: { EventCard },
})
export default class Available extends Vue {
  bike_model = "" as string;
  bike_brand = "" as string;
  cpf = "" as string;
  reference_point = "" as string;
  service_type = "" as string;
  observation = "" as string;
  items = [
    { name: "Regulagem de selim", id: 0 },
    { name: "Regulagem de marcha", id: 1 },
    { name: "Regulagem de câmbio", id: 2 },
    { name: "Regulagem de guidão", id: 3 },
    { name: "Regulagem de mesa", id: 4 },
    { name: "Aperto de mesa", id: 5 },
    { name: "Aperto de pedal", id: 6 },
    { name: "Aperto de roda", id: 7 },
    { name: "Aperto de direção", id: 8 },
    { name: "Aperto de mov. central", id: 9 },
    { name: "Aperto de pedivela", id: 10 },
    { name: "Aperto de sup. de garrafa", id: 11 },
    { name: "Reparo de acessórios", id: 12 },
    { name: "Reparo de câmbio", id: 13 },
    { name: "Reparo de eixo", id: 14 },
    { name: "Reparo de câmara", id: 15 },
    { name: "Reparo de corrente", id: 16 },
    { name: "Reparo de pneu", id: 17 },
    { name: "Calibragem de pneu", id: 18 },
    { name: "Lubrificação de corrente", id: 19 },
    { name: "Troca de selim", id: 20 },
    { name: "Outros serviços", id: 21 },
  ];

  async sendFormData() {
    return null;
  }

  created() {
    this.sendFormData();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

@media (min-width: 960px) {
  .title-content {
    font-size: 1.3em;
    font-weight: 500 !important;
    color: $main-dark-color;
    margin: 5px auto 0px 10px;
  }
}
</style>
