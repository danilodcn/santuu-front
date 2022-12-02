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
        <h4 class="no-list" v-if="orders < 0">Nenhum Chamando</h4>
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

@Component({
  components: { SosCard },
})
export default class Available extends Vue {
  orders = {};

  async getOrder() {
    this.orders = await sosService.getListCall();
  }
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
