<template>
  <v-form>
    <v-container
      v-if="!mapping && haveOpenOrder && is_mechanic"
      class="content-container justify-center mt-4 mt-md-3 px-7"
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon light @click="backButton()">
          <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          Chamado SOS
        </v-toolbar-title>
      </v-toolbar>
      <v-row
        class="text-center"
        v-if="callStatus !== order_status_choices.finished"
      >
        <v-col cols="12" class="px-6">
          <v-hover v-slot="{ hover }">
            <v-card
              :class="{ 'on-hover': hover }"
              :elevation="hover ? 3 : 2"
              @click="mapping = !mapping"
            >
              <div :class="!img_updated ? 'align-center pt-4' : 'align-center'">
                <v-img
                  :gradient="
                    !img_updated
                      ? 'to top right, rgba(255,255,255,.6), rgba(255,255,255,.8)'
                      : ''
                  "
                  :lazy-src="imgLocDefault"
                  height="150"
                  :src="imgLocDefault"
                ></v-img>
              </div>
              <v-card-text class="mx-0">
                {{ order_data.service_address }}
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Ciclista:</v-list-item-subtitle>
              <v-list-item-title>{{
                order_data.associate_name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Marca da bike:</v-list-item-subtitle>
              <v-list-item-title>{{
                order_data.service_bike_brand
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Modelo da bike:</v-list-item-subtitle>
              <v-list-item-title>{{
                order_data.service_bike_model
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Tipo de serviço:</v-list-item-subtitle>
              <v-list-item-title> {{ service_name }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Ponto de referência:</v-list-item-subtitle>
              <v-list-item-title>
                {{ order_data.service_ref_location }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Obs.:</v-list-item-subtitle>
              <v-list-item-title>{{
                order_data.service_text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="imgs">
            <v-list-item-content>
              <v-row>
                <v-btn text color="primary" @click="overlay1 = !overlay1">
                  Imagem SOS 1
                </v-btn>
                <v-overlay z-index="2" :value="overlay1">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-img
                        :lazy-src="order_data.img_detail1"
                        max-height="500"
                        max-width="400"
                        :src="order_data.img_detail1"
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-btn
                        class="white--text"
                        color="primary"
                        @click="overlay1 = false"
                      >
                        Fechar imagem
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-overlay>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="imgs">
            <v-list-item-content>
              <v-row>
                <v-btn text color="primary" @click="overlay2 = !overlay2">
                  Imagem SOS 2
                </v-btn>
                <v-overlay z-index="1" :value="overlay2">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-img
                        :lazy-src="order_data.img_detail2"
                        max-height="500"
                        max-width="400"
                        :src="order_data.img_detail2"
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-btn
                        color="primary"
                        @click="overlay2 = false"
                        class="white--text"
                      >
                        Fechar imagem
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-overlay>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="haveImg3" class="imgs">
            <v-list-item-content>
              <v-row>
                <v-btn
                  class="white--text text"
                  color="primary"
                  @click="overlay3 = !overlay3"
                >
                  Imagem SOS 3
                </v-btn>
                <v-overlay z-index="1" :value="overlay3">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-img
                        :lazy-src="order_data.img_detail3"
                        max-height="500"
                        max-width="400"
                        :src="order_data.img_detail3"
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-btn
                        class="white--text"
                        color="primary"
                        @click="overlay3 = false"
                      >
                        Fechar imagem
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-overlay>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          class="px-6"
          v-if="callStatus !== 'finished'"
          justify="space-between"
        >
          <v-btn color="primary" align="right" @click.stop="dialog = true">
            <div>
              {{ buttonStatusText }}
            </div>
          </v-btn>
          <v-badge
            color="white"
            dot
            offset-x="12"
            offset-y="12"
            :value="has_new_messages"
            class="msg-blink"
          >
            <v-btn color="primary" class="ml-5" @click="chat()"> Chat </v-btn>
          </v-badge>
        </v-col>
        <v-col cols="12" v-else-if="callStatus === 'finished'">
          <v-btn color="primary" class="ml-5" @click="backListCall()">
            <v-icon dark left> mdi-arrow-left </v-icon>
            Voltar
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="1" class="align-md-content-end">
          <!-- #TODO -->
          <v-dialog v-model="dialog" max-width="500" persistent>
            <v-card>
              <v-card-text class="pa-5">
                <div v-if="callStatus === 'progress'">
                  Você confirma que está indo ao local?
                </div>
                <div v-if="callStatus === 'travel'">
                  Você confirma que chegou no local?
                </div>
                <div v-else-if="callStatus === 'repair'">
                  Você confirma que finalizou o chamado?
                </div>
                <div v-else-if="callStatus === 'finished'">
                  Muito bom! Você acabou de finalizar um chamado. Deixe uma
                  observação sobre o chamado.
                  <v-textarea
                    v-model="mechanic_report"
                    clearable
                    rows="2"
                    max-rows="2"
                    no-resize
                    :rules="[
                      (v) => v.length <= 200 || 'Máximo 200 caracteres.',
                    ]"
                    counter="200"
                    label="Observação"
                  />
                  <span v-text="warning" />
                </div>
              </v-card-text>

              <v-card-actions v-if="callStatus !== 'finished'">
                <v-btn color="red darken-1" text @click="confirmDialog(false)">
                  Não
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="confirmDialog(true)">
                  Sim
                </v-btn>
              </v-card-actions>
              <v-card-actions v-else>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="sendObservationOrNothing()"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-show="mapping === true && haveOpenOrder === true"
      class="content-container mt-4 mt-md-3 px-7"
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon light @click="mapping = !mapping">
          <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          Localização
        </v-toolbar-title>
      </v-toolbar>
      <v-row
        v-if="
          (mechanicPosition.lat == -23.585435911394608 &&
            mechanicPosition.lng == -46.45477146101012) ||
          mechanicPosition.lat == undefined ||
          mechanicPosition.lng == undefined
        "
      >
        <v-col cols="12 px-8">
          <p>Não foi possível acessar sua localização!</p>
          <p class="grey--text text--darken-4 text-subtitle-1">
            Autorize o acesso à localização pelo seu navegador em:
          </p>
          <p class="grey--text text--darken-4 text-subtitle-1">
            <span class="font-weight-bold">iPhone</span> <br />
            Ajustes » Privacidade » Serviços de Localização » Sites do Safari »
            Durante o uso do app
          </p>
          <p class="grey--text text--darken-4 text-subtitle-1">
            <span class="font-weight-bold">Android</span> <br />
            Configurações » Localização » Navegador utilizado » Permitir durante
            o uso do app
          </p>
          <p class="grey--text text--darken-4 text-subtitle-1">
            Para que o site possa acessar sua localização, você deve permitir
            quando perguntado. Caso a pergunta não apareça, você pode permitir
            através das configurações do site pelo navegador.
          </p>
        </v-col>
      </v-row>
      <div v-else>
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
        </v-row>
      </div>
    </v-container>
    <v-container
      class="fill-height content-container mt-4 mt-md-3 px-7"
      v-if="!haveOpenOrder || !is_mechanic"
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
          <div v-if="is_mechanic">Você não possui chamado aberto.</div>
          <div v-else>Você não tem permissão para acessar essa tela.</div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { ISosCallForm } from "@/types/sos";
import {
  items,
  getLocImage,
  order_status_choices,
  STATUS_NUMBER,
} from "@/utils/sos";

@Component({
  components: { EventCard },
})
export default class Available extends BaseComponent {
  order_status_choices = order_status_choices;
  has_new_messages = false;

  is_mechanic = false;
  mapping = false;
  haveOpenOrder = false;
  imgLocDefault =
    "https://png.pngtree.com/png-clipart/20190516/original/pngtree-location-vector-icon-png-image_4017380.jpg";
  img_updated = false;
  cpf = "000.000.000-00";
  service_name = "";
  service_type = 1;
  haveImg3 = false;
  cyclistStaticPosition = { lat: -23.585435911394608, lng: -46.45477146101012 };
  dialog = false;
  callStatus = "travel";
  order_data = {} as ISosCallForm;
  dataMapLoaded = false;
  img_detail3: any = "";
  overlay1 = false;
  overlay2 = false;
  overlay3 = false;
  //map config
  apiKey = "AIzaSyDVMlhAb27wQjAxWhww-vEKbmUtQXZjE88";
  mechanicPosition = { lat: -23.585435911394608, lng: -46.45477146101012 };
  cyclistPosition = { lat: -23.585435911394608, lng: -46.45477146101012 };
  mode = "bicycling";
  buttonStatusText = "";
  mechanic_report = "";
  warning = "";

  confirmDialog(confirm: boolean) {
    if (confirm == true && this.callStatus == order_status_choices.travel) {
      this.dialog = false;
      this.callStatus = order_status_choices.repair;
      this.updateStatus(order_status_choices.repair);
    } else if (
      confirm == true &&
      this.callStatus == order_status_choices.repair
    ) {
      this.callStatus = order_status_choices.finished;
      this.updateStatus(order_status_choices.finished);
    } else if (
      confirm == true &&
      this.callStatus == order_status_choices.progress
    ) {
      this.callStatus = order_status_choices.travel;
      this.updateStatus(order_status_choices.travel);
    } else {
      this.dialog = false;
    }
    this.get_button_status_text();
  }

  async checkMechanic() {
    let response = await sosService.checkMechanic();
    this.is_mechanic = response.is_mechanic;
  }

  async sendMechanicReport() {
    let data = {
      id: this.order_data.id,
      mechanic_report: this.mechanic_report,
    };
    await sosService.sendMechanicReport(data);
  }

  sendObservationOrNothing(): void {
    if (this.mechanic_report == "") {
      this.dialog = false;
    } else if (this.mechanic_report.length > 200) {
      this.warning = "Texto ultrapassou o limite de 200 caracteres.";
    } else {
      this.sendMechanicReport();
      this.dialog = false;
    }
  }

  async get_button_status_text() {
    this.order_data = await sosService.getOrder(this.order_data.id);
    let status = this.order_data.service_status;
    if (status == STATUS_NUMBER.PROGRESS) {
      this.callStatus = "progress";
      this.buttonStatusText = "Indo ao local";
    } else if (status == STATUS_NUMBER.TRAVEL) {
      this.callStatus = "travel";
      this.buttonStatusText = "Cheguei no local";
    } else if (status == STATUS_NUMBER.REPAIR) {
      this.callStatus = "repair";
      this.buttonStatusText = "Finalizar";
    } else {
      clearInterval(this.interval_1);
      clearInterval(this.interval_2);
      clearInterval(this.interval_3);
      return "Finalizado";
    }
  }

  LocImage() {
    this.cyclistStaticPosition = JSON.parse(
      `${this.order_data.associated_coordinates}`
    );
    let imgAux = this.imgLocDefault;
    this.imgLocDefault = getLocImage(
      this.cyclistStaticPosition.lat,
      this.cyclistStaticPosition.lng,
      this.apiKey
    );
    if (this.imgLocDefault != imgAux) {
      this.img_updated = true;
    }
  }

  async updateStatusTravel() {
    this.buttonStatusText = "Cheguei no local";
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
    await this.updateStatus("travel");
    this.sendSosInitialMechanicPosition(
      `{"lat":"${this.mechanicPosition.lat}","lng":"${this.mechanicPosition.lng}"}`
    );
    this.callStatus == order_status_choices.travel;
    this.get_button_status_text();
  }

  async getOpenOrder() {
    this.order_data = await sosService.getOpenOrder();
    if (this.order_data.id) {
      this.haveOpenOrder = true;
      if (this.order_data.service_status == 1) {
        this.changeMainDialog({
          msg: `O chamado #${this.order_data.id} está em progresso. O ciclista está aguardando a sua ajuda, confirme que está indo ao local.`,
          title: "Novo chamado SOS!",
          persistent: true,
          active: true,
          bntClose: false,
          btnOkOnly: true,
          msgOk: "Estou indo!",
          ident: false,
          afterFunction: this.updateStatusTravel,
        });
      }
    }
    this.service_type = this.order_data.service_type;
    this.service_name =
      items.find((x) => x.id == this.service_type)?.name || "";
    if (this.img_detail3 != "") {
      this.haveImg3 = false;
    }
    this.LocImage();
    this.get_cyclistPosition();
    this.get_button_status_text();
  }

  get_cyclistPosition(): void {
    let coords = JSON.parse(this.order_data.associated_coordinates);
    this.cyclistPosition = JSON.parse(
      `{"lat": ${coords.lat}, "lng": ${coords.lng} }`
    );
  }

  backButton() {
    this.$router.push({ path: "/sos/home/" });
  }

  async updateStatus(nextStatus: string) {
    await sosService.updateStatus({
      order_id: this.order_data.id,
      status: nextStatus,
    });
  }

  async sendSosInitialMechanicPosition(actualCoordinates: string) {
    await sosService.sendSosMechanicPosition({
      order_id: this.order_data.id,
      actual_coordinates: actualCoordinates,
    });
  }

  chat() {
    this.$router.push({ path: "/sos/chat/" });
  }

  backListCall() {
    this.$router.push({ path: "/sos/list-call/" });
  }

  //mapa
  options = {
    enableHighAccuracy: true,
  };

  // eslint-disable-next-line
  coords = {} as GeolocationCoordinates;

  // eslint-disable-next-line
  success(position: GeolocationPosition) {
    this.coords = position.coords;
    if (this.coords.accuracy < 16000) {
      this.mechanicPosition = JSON.parse(
        `{"lat": ${this.coords.latitude}, "lng": ${this.coords.longitude} }`
      );
    }
    console.log(this.coords.accuracy);
  }
  // eslint-disable-next-line
  error(error: GeolocationPositionError) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  async sendActualPosition() {
    if (this.callStatus == order_status_choices.travel) {
      let position = `{"lat":"${this.mechanicPosition.lat}","lng":"${this.mechanicPosition.lng}"}`;
      await sosService.updateMechanicPosition({
        actual_coordinates: position,
      });
    }
  }

  sendLocation() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
    this.dataMapLoaded = true;
    this.sendActualPosition();
  }

  async hasNewMsg() {
    const response = await sosService.hasNewMessages(this.order_data.id);
    this.has_new_messages = response.has_new_messages;
  }

  interval_1!: any;
  interval_2!: any;
  interval_3!: any;
  created() {
    this.getOpenOrder();
    this.checkMechanic();
    this.interval_1 = setInterval(this.getOrder, 5000);
    this.interval_2 = setInterval(this.hasNewMsg, 5000);
    this.interval_3 = setInterval(this.sendLocation, 3000);
  }

  sendToBegin() {
    this.$router.push({ path: "/sos/home/" });
  }

  async getOrder() {
    this.order_data = await sosService.getOrder(this.order_data.id);
    if (this.order_data.service_status == STATUS_NUMBER.CANCELED) {
      clearInterval(this.interval_1);
      clearInterval(this.interval_2);
      clearInterval(this.interval_3);
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
    }
  }
  beforeDestroy() {
    clearInterval(this.interval_1);
    clearInterval(this.interval_2);
    clearInterval(this.interval_3);
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
  .center-vertically {
    top: 50%;
  }
  .content-container {
    margin-left: auto;
    margin-top: 30px !important;
    border-radius: 10px;
    background: white;
    max-width: 600px;
  }
}
.imgs {
  text-decoration: underline;
  text-decoration-color: $main-dark-color;
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
}
</style>
