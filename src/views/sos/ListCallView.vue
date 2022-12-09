<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="backButton()">
        <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">
        Chamados SOS
      </v-toolbar-title>
    </v-toolbar>
    <div class="call">
      <v-row>
        <template v-for="(order, i) in order_data">
          <v-col cols="12" sm="6" md="4" v-if="order" :key="`event-${i}`">
            <SosCard :data="order" />
          </v-col>
        </template>
        <h4 class="no-list" v-if="order_data.length < 1">Nenhum Chamando</h4>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SosCard from "@/components/shared/sos/SosCard.vue";
import { sosService } from "@/api/sos";
import { IOrder, ISosCallForm } from "@/types/sos";

@Component({
  components: { SosCard },
})
export default class Available extends Vue {
  order_data = {} as ISosCallForm;

  async getClaimList() {
    const response = await sosService.getClaimList();
    if (response.error) {
      console.log(console.error());
    } else {
      this.order_data = response;
    }
  }

  backButton() {
    this.$router.push({ path: "/sos/home/" });
  }

  created() {
    this.getClaimList();
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
