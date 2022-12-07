<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-row>
      <h4 class="title-content">Avaliação do Chamado</h4>
    </v-row>
    <v-row class="ma-0 pa-0">
      <p>Chamado realizado em: {{ get_date }}</p>
    </v-row>
    <v-container class="row-center ma-15 pa-3">
      <v-col cols="4" class="ma-10 pa-8">
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="100" v-bind="attrs" v-on="on">
                <img :src="data.avatarUrl" />
              </v-avatar>
            </template>
          </v-menu>
        </div>
        <v-col class="col-15 pa-0 mb-10">
          <v-rating
            background-color="grey lighten-2"
            color="warning"
            length="5"
            size="25"
            :value="data.rating"
            half-increments
          >
          </v-rating>
        </v-col>
        <v-col class="row-center pa-15">
          <div>
            <v-text-field label="Deixe um comentário"></v-text-field>
          </div>
        </v-col>
        <v-col cols="15">
          <v-btn color="#CCCB00" class="white--text">Chat</v-btn>
        </v-col>
        <v-col cols="15">
          <v-btn color="#CCCB00" class="ma-0 pa-0" text="">Não avaliar</v-btn>
        </v-col>
      </v-col>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SosCard from "@/components/shared/sos/SosCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";
import { formatDate } from "@/utils/utils";

@Component({
  components: {},
})
export default class Available extends Vue {
  data = {
    id: 1,
    associate: 22,
    service_bike: 20,
    service_bike_model: "service_bike_model",
    service_bike_brand: "service_bike_brand",
    service_type: 5,
    service_text: "string",
    service_bike_lane: 2,
    service_ref_location: "Marginal Pinheiros, São Paulo-SP",
    mechanic: 5,
    service_status: "Aberto",
    service_protocol: "service_protocol",
    status_text: "status_text",
    coordinates: "-23.580483258417278, -46.661190902681504",
    mechanic_name: "João",
    rating: 3.5,
    date: "2022-10-03 19:35:35.993822",
    avatarUrl: "https://avatars.githubusercontent.com/u/31135098?v=4",
  };

  get_date(): string {
    return formatDate(this.data.date);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.row-center {
  display: flex;
  align-items: center;
  text-align: center;
}
.title-content {
  font-weight: 500 !important;
  color: $main-dark-color;
  margin: 5px auto 30px 10px;
}
@media (min-width: 960px) {
  .title-content {
    font-size: 1.5em;
  }
}
</style>
