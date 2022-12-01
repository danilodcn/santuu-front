<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-row>
      <h4 class="title-content">Chamados Finalizados</h4>
    </v-row>
    <div class="events">
      <v-row>
        <template v-for="(order, i) in orders">
          <v-col cols="12" sm="6" md="4" v-if="order" :key="`event-${i}`">
            <SosCard :data="orders" />
          </v-col>
        </template>
        <h4 class="no-event" v-if="orders < 0">Nenhum Chamando</h4>
      </v-row>
    </div>
    <v-divider class="mt-10"></v-divider>
    <v-row justify="space-between" class="mt-10 mx-4">
      <v-btn> Voltar </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SosCard from "@/components/shared/sos/SosCard.vue";
import { IOrder } from "@/types/sos";

@Component({
  components: { SosCard },
})
export default class Available extends Vue {
  orders = {};
  type = this.$route.query.type as string;

  async getEvents() {
    let orders = {
      id: "id",
      associate: "associate",
      service_bike: "service_bike",
      service_bike_model: "service_bike_model",
      service_bike_brand: "service_bike_brand",
      service_type: "number",
      service_text: "string",
      service_bike_lane: "number",
      service_ref_location: "Marginal Pinheiros, São Paulo-SP",
      mechanic: "José",
      service_status: "Finalizado",
      service_protocol: "service_protocol",
      status_text: "status_text",
      coordinates: "-23.580483258417278, -46.661190902681504",
    };

    this.orders = orders;
  }
  // handleEvents() {
  //   this.orders = this.order.map((e) => {
  //     return { ...e, url: e.service_ref_location };
  //   });
  // }

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
