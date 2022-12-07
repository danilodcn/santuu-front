<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-row>
      <h4 class="title-content">Chamados</h4>
    </v-row>
    <div class="call">
      <v-row>
        <template v-for="(order, i) in orders">
          <v-col cols="12" sm="6" md="4" v-if="order" :key="`event-${i}`">
            <SosCard :data="orders" />
          </v-col>
        </template>
        <h4 class="no-list" v-if="orders.leght > 0">Nenhum Chamando</h4>
      </v-row>
    </div>
    <v-divider class="mt-10"></v-divider>
    <v-row justify="space-between" class="mt-10 mx-4">
      <v-btn href="dashboard">Voltar</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SosCard from "@/components/shared/sos/SosCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";

@Component
export default class Available extends Vue {
  orders = {
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
  };

  // async getListCall() {
  //   const response = await sosService.getListCall();
  //   if (response.error) {
  //     console.log(console.error());
  //   } else {
  //     this.orders = response;
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.call {
  min-height: 400px;
}
.button {
  color: $main-dark-color !important;
}
.no-list {
  font-weight: 200;
  color: $main-dark-color;
  margin: 40px auto 0px 40px;
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
