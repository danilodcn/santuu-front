<template>
  <section>
    <v-container
      class="content-container mt-4 mt-md-3 px-7"
      v-show="!mapping && !is_mechanic"
    >
      <v-row class="ma-0 timeline d-flex align-center col-12">
        <v-col class="col-xs-10 offset-xs-1 col-md-6 offset-md-3 mt-8">
          Acompanhe o seu chamado
        </v-col>
        <v-timeline class="pa-0 col-xs-12 offset-xs-0 col-md-6 offset-md-3">
          <v-timeline-item
            v-for="(x, i) in current_status"
            :key="i"
            :color="getColorByStatus(x.status)"
            :id="`timeline-item-${x.position}`"
            :class="{ 'pb-0': i == current_status.length - 1 }"
            small
          >
            <p
              class="body-2 font-weight-medium"
              :style="`color: ${getColorByStatus(x.status)}`"
              v-if="x.position == 0"
            >
              {{
                order_data.mechanic
                  ? `Seu chamado foi atribuído ao mecânico ${order_data.mechanic_name}`
                  : `${x.status_text}`
              }}
            </p>
            <p
              v-else
              class="body-2 font-weight-medium"
              :style="`color: ${getColorByStatus(x.status)}`"
            >
              {{ `${x.status_text}` }}
            </p>
          </v-timeline-item>
        </v-timeline>
      </v-row>
      <!-- <v-row
        class="col-xs-12 offset-xs-0 col-md-6 offset-md-3 my-0 px-6"
        v-if="order_data.mechanic"
      >
        <p class="body-2 col-12 pa-0 ma-0">
          Mecânico: {{ order_data.mechanic_name }}
        </p>
      </v-row> -->
      <v-card-actions class="my-3">
        <v-row justify="center" class="mx-1" v-if="!isFinished || cancelled">
          <v-btn
            :disabled="!canCancel"
            color="#FF5252"
            class="white--text mr-2"
            @click="cancel"
            >Cancelar</v-btn
          >
          <v-btn
            v-show="canCancel"
            :disabled="!can_see_location"
            color="#1B5E"
            class="white--text mx-2"
            @click="mapping = true"
          >
            <v-icon dark> mdi-map-marker </v-icon></v-btn
          >
          <v-badge
            color="white"
            dot
            offset-x="12"
            offset-y="12"
            :value="has_new_messages"
            class="msg-blink"
          >
            <v-btn
              color="#CCCB00"
              class="button white--text ml-2"
              @click="chat"
              dot
            >
              Chat
            </v-btn>
          </v-badge>
        </v-row>
        <v-row justify="center" v-else>
          <v-btn color="#FF5252" class="white--text" @click="sendToBegin()"
            >Voltar</v-btn
          >
        </v-row>
      </v-card-actions>
      <loading-tips
        :type="user_types.cyclist"
        :time_showing_ms="5000"
        class="text-justify col-xs-10 offset-xs-1 col-md-6 offset-md-3 mb-xs-0 mb-md-2"
      ></loading-tips>
    </v-container>
    <v-container
      class="px-10 container elevation-xs-0 elevation-md-10"
      v-show="mapping && !is_mechanic"
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon light @click="mapping = false">
          <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          Localização
        </v-toolbar-title>
      </v-toolbar>
      <div class="map-div" v-if="true">
        <v-row no-gutters>
          <v-col cols="12">
            <GmapMap
              :center="mechanicPosition"
              :zoom="17"
              style="width: 100%; height: 550px"
            >
              <GmapMarker
                :position="mechanicPosition"
                :clickable="true"
                :draggable="false"
                :icon="'https://img.icons8.com/material-two-tone/2x/work.png'"
              />
              <GmapMarker
                :position="cyclistPosition"
                :clickable="true"
                :draggable="false"
              />
            </GmapMap>
          </v-col>
        </v-row></div
    ></v-container>
    <v-container
      class="fill-height content-container mt-4 mt-md-3 px-7"
      v-if="is_mechanic"
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon light @click="backButton()">
          <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          Ops
        </v-toolbar-title>
      </v-toolbar>
      <v-row class="text-center p-16">
        <v-col cols="12">
          <div>Você não tem permissão para acessar essa tela.</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";
import {
  status,
  status_finished,
  user_types,
  STATUS_NUMBER,
  order_status_choices,
} from "@/utils/sos";
import LoadingTips from "@/components/LoadingTips.vue";
import { BaseComponent } from "@/utils/component";

@Component({
  components: { EventCard, LoadingTips },
})
export default class Available extends BaseComponent {
  order_data = {} as IOrder;
  order_id = -1;
  is_mechanic = false;

  mapping = false;
  can_see_location = false;
  mechanicPosition = { lat: -23.585435911394608, lng: -46.45477146101012 };
  cancelled = false;
  user_types = user_types;

  current_status = [
    {
      status_text: "Carregando",
      status: [-1],
      position: 0,
    },
  ];
  status = status;
  status_finished = status_finished;

  colors = {
    past: "#DDDDB3",
    current: "#B8B703",
    future: "#989898",
  };
  colors_finished = {
    past: "#DDDDB3",
    current: "#FF5252",
    future: "#989898",
  };

  has_new_messages = false;

  get cyclistPosition() {
    let coords = JSON.parse(this.order_data.associated_coordinates);
    return JSON.parse(`{"lat": ${coords.lat}, "lng": ${coords.lng} }`);
  }

  async get_mechanic_position() {
    if (this.order_data.mechanic) {
      const response = await sosService.getMechanicPosition(this.order_data.id);
      let coords = JSON.parse(response.coordinates);
      this.mechanicPosition = JSON.parse(
        `{"lat": ${coords.lat}, "lng": ${coords.lng} }`
      );
    } else {
      this.mechanicPosition = JSON.parse(`{"lat": 45.0, "lng": 10.0 }`);
    }
  }

  backButton() {
    this.$router.push({ path: "/sos/home/" });
  }

  get currentColor() {
    if (this.order_data == ({} as IOrder)) {
      return this.colors;
    }
    if (this.order_data.service_status == STATUS_NUMBER.FINISHED) {
      return this.colors_finished;
    }
    return this.colors;
  }

  sendToBegin() {
    this.$router.push({ path: "/sos/home/" });
  }

  async checkMechanic() {
    let response = await sosService.checkMechanic();
    this.is_mechanic = response.is_mechanic;
  }

  cancel() {
    this.changeMainDialog({
      active: true,
      bntClose: true,
      msg: "",
      persistent: true,
      btnOkCancel: true,
      msgOk: "Sim",
      msgCancel: "Não",
      title: "Você deseja realmente cancelar?",
      ident: true,
      afterFunction: this.finalCancel,
    });
  }

  async finalCancel(can_cancel: boolean) {
    if (!can_cancel) {
      return;
    }
    this.cancelled = true;
    this.changeLoading(true);
    const response = await sosService.updateStatus({
      order_id: this.order_id,
      status: order_status_choices.canceled,
    });
    this.changeLoading(false);
    if (!response.error) {
      this.order_data = response;
      this.changeMainDialog({
        active: true,
        bntClose: false,
        msg: "Seu chamado foi cancelado, você será levado para página inicial.",
        persistent: true,
        btnOkOnly: true,
        msgOk: "OK",
        title: "Cancelado",
        ident: false,
        afterFunction: this.sendToBegin,
      });
    } else {
      return;
    }
  }
  get canCancel() {
    return [
      STATUS_NUMBER.OPEN,
      STATUS_NUMBER.PROGRESS,
      STATUS_NUMBER.TRAVEL,
    ].includes(this.order_data.service_status);
  }

  findCommonElements(arr1: any[], arr2: any[]) {
    return arr1.some((item) => arr2.includes(item));
  }

  getColorByStatus(status: number[]) {
    if (!("id" in this.order_data)) {
      return;
    }

    const current_status = this.current_status.find((x: any) =>
      x.status.includes(this.order_data.service_status)
    );
    const given_status = this.current_status.find((x: any) =>
      this.findCommonElements(x.status, status)
    );

    const current_position = current_status?.position || 0;
    const given_position = given_status?.position || 0;
    if (current_position > given_position) {
      return this.currentColor.past;
    } else if (current_position == given_position) {
      this.clearBlink();
      if (this.order_data.service_status != STATUS_NUMBER.FINISHED) {
        this.setToBlink(current_position);
      }
      return this.currentColor.current;
    } else {
      return this.currentColor.future;
    }
  }

  clearBlink() {
    Array.from(document.querySelectorAll(".blink")).forEach((el) =>
      el.classList.remove("blink")
    );
  }
  setToBlink(position: number) {
    (
      document.getElementById(`timeline-item-${position}`)?.lastChild?.lastChild
        ?.lastChild as HTMLElement
    ).classList.add("blink");
  }

  created() {
    this.getOpenOrder();
    this.checkMechanic();
  }

  chat() {
    this.$router.push({ path: "/sos/chat/" });
  }

  clearIntervals() {
    clearInterval(this.interval_1);
    clearInterval(this.interval_2);
    clearInterval(this.interval_3);
  }

  setStatus() {
    if (this.order_data.service_status == STATUS_NUMBER.FINISHED) {
      this.current_status = this.status_finished;
      this.clearIntervals();
    } else {
      this.current_status = this.status;
    }
  }

  get isFinished() {
    return this.order_data.service_status == STATUS_NUMBER.FINISHED;
  }

  async getOpenOrder() {
    const response = await sosService.getOpenOrder();
    if (!response.error) {
      this.order_data = response;
      this.setStatus();
    } else {
      this.changeMainDialog({
        active: true,
        bntClose: false,
        msg: "Você não tem chamado aberto",
        persistent: true,
        btnOkOnly: true,
        msgOk: "OK",
        title: "Sem chamado aberto",
        ident: false,
        afterFunction: this.sendToBegin,
      });
      return;
    }
    this.order_id = this.order_data.id;
    setTimeout(this.refreshingTimeline, 5000);
    this.interval_1 = setInterval(this.hasNewMsg, 5000);
    this.interval_2 = setInterval(this.getOrder, 5000);
    this.interval_3 = setInterval(this.get_mechanic_position, 3000);
  }

  async getOrder() {
    this.order_data = await sosService.getOrder(this.order_id);
    if (this.order_data.service_status == 4) {
      this.clearIntervals();
      this.$router.push({ path: "/sos/rating/" });
    } else if (this.order_data.service_status >= 2 && !this.can_see_location) {
      this.can_see_location = true;
    }
  }

  async hasNewMsg() {
    const response = await sosService.hasNewMessages(this.order_id);
    this.has_new_messages = response.has_new_messages;
  }

  interval_1!: any;
  interval_2!: any;
  interval_3!: any;

  refreshingTimeline() {
    this.$forceUpdate();
  }
  beforeDestroy() {
    clearInterval(this.interval_1);
    clearInterval(this.interval_2);
    clearInterval(this.interval_3);
  }
}
</script>

<style lang="scss">
@import "@/scss/main.scss";

@media (min-width: 960px) {
  .title-content {
    font-size: 1.3em;
    font-weight: 500 !important;
    color: $main-dark-color;
    margin: 5px auto 0px 10px;
  }
  .content-container {
    margin-left: auto;
    margin-top: 30px !important;
    border-radius: 10px;
    background: white;
    max-width: 600px;
  }
}
@keyframes blinking {
  from {
    background-color: #ddddb3;
  }
  to {
    background-color: #b8b703;
  }
}
.blink {
  -webkit-animation-name: blinking;
  animation-name: blinking;
  -moz-animation-name: blinking;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -moz-animation-duration: 1s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -moz-animation-direction: alternate;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
}
.timeline {
  min-height: 50vh;
}

@keyframes msg-blinker {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.msg-blink .v-badge__badge {
  animation-name: msg-blinker;
  -moz-animation-name: msg-blinker;
  -webkit-animation-name: msg-blinker;
  animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  -moz-animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  -webkit-animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
  animation-duration: 1.7s;
  -moz-animation-duration: 1.7s;
  -webkit-animation-duration: 1.7s;
}
</style>
