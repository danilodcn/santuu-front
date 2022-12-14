<template>
  <v-container class="content-container mt-10 mt-md-3 px-10 align-center">
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="backButton()">
        <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">
        SOS Bike
      </v-toolbar-title>
    </v-toolbar>
    <div class="call pt-10">
      <v-row class="justify-center">
        <template>
          <v-card
            class="mx-10 mb-6 text-center pt-4 px-6"
            max-width="200"
            @click="nextStep()"
            :class="{
              'active-call': mechanicWithOpenOrder,
              'no-active-call': !mechanicWithOpenOrder,
            }"
          >
            <v-icon v-if="is_mechanic" size="100"> mdi-cog </v-icon>
            <v-icon v-else size="100"> mdi-cog </v-icon>
            <v-card-text> {{ text }} </v-card-text>
          </v-card>
          <v-card
            class="mx-10 mb-6 text-center pt-4"
            max-width="200"
            @click="openListCalls()"
          >
            <v-icon size="100"> mdi-calendar </v-icon>
            <v-card-text> Histórico de chamados </v-card-text>
          </v-card>
        </template>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SosCard from "@/components/shared/sos/SosCard.vue";
import { BaseComponent } from "@/utils/component";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";

@Component({
  components: { SosCard },
})
export default class Available extends BaseComponent {
  is_mechanic = false;
  profile = {} as any;
  text = "";
  image = "";
  hasOpenOrder = false;
  order_data!: IOrder;
  interval!: any;

  get mechanicWithOpenOrder() {
    return this.is_mechanic && this.hasOpenOrder;
  }

  async getOpenOrder() {
    this.order_data = await sosService.getOpenOrder();
    if (this.order_data.id) {
      this.hasOpenOrder = true;
    } else {
      this.hasOpenOrder = false;
    }
  }

  async check_mechanic() {
    this.changeLoading(true);
    let response = await sosService.checkMechanic();
    this.is_mechanic = response.is_mechanic;
    if (this.is_mechanic) {
      this.text = "Chamados";
    } else {
      this.text = "Criar chamado";
    }
    this.changeLoading(false);
  }

  nextStep() {
    if (this.is_mechanic == false) {
      this.$router.push({ path: "/sos/choose-lane" });
    } else {
      this.$router.push({ path: "/sos/active-call" });
    }
  }

  openListCalls() {
    this.$router.push({ path: "/sos/list-call" });
  }

  backButton() {
    this.$router.push({ path: "/sos/" });
  }

  created() {
    this.check_mechanic();
    this.getOpenOrder();
    this.interval = setInterval(this.getOpenOrder, 5000);
  }
  beforeUnmount() {
    clearInterval(this.interval);
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
.no-active-call {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 10px solid rgb(228, 228, 228);
}
@keyframes msg-blinker {
  from {
    border: 10px solid rgba(204, 203, 0, 0.5);
  }
  to {
    border: 10px solid rgba(204, 203, 0, 1);
  }
}
.active-call {
  -webkit-animation-name: msg-blinker;
  animation-name: msg-blinker;
  -moz-animation-name: msg-blinker;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  -moz-animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  -webkit-animation-duration: 1.7s;
  animation-duration: 1.7s;
  -moz-animation-duration: 1.7s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -moz-animation-direction: alternate;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
