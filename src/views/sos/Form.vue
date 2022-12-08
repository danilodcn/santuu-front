<template>
  <v-form class="form title-content" ref="form">
    <v-container
      v-show="mapping === false"
      class="content-container mt-4 mt-md-3 px-7"
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon light @click="backButton()">
          <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          Criação do chamado
        </v-toolbar-title>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-hover v-slot="{ hover }">
            <v-card
              :class="!img_updated ? 'pt-4 mb-8' : 'mb-8'"
              :elevation="hover ? 3 : 2"
              @click="mapClick()"
            >
              <v-img
                :gradient="
                  !img_updated
                    ? 'to top right, rgba(255,255,255,.6), rgba(255,255,255,.8)'
                    : ''
                "
                :lazy-src="imgLocDefault"
                :height="!img_updated ? 100 : 180"
                :contain="!img_updated"
                :src="imgLocDefault"
              ></v-img>
              <v-card-text class="mx-0">
                {{ cardText }}
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-text-field
            v-model="form.associate_cpf"
            label="CPF"
            v-mask="'###.###.###-##'"
            :rules="obrigatory.concat([(v) => isValidCPF(v) || 'CPF inválido'])"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-text-field
            v-model="form.service_bike_brand"
            label="Marca da bike"
            :rules="obrigatory"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-text-field
            v-model="form.service_bike_model"
            label="Modelo da bike"
            :rules="obrigatory"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-select
            :items="items"
            v-model="form.service_type"
            item-text="name"
            item-value="id"
            :rules="obrigatory"
            label="Tipo de serviço"
          ></v-select>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-text-field
            v-model="form.service_ref_location"
            label="Ponto de referência"
            :rules="obrigatory"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-text-field
            v-model="form.service_text"
            label="Observação"
            :rules="obrigatory"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-file-input
            filled
            label="Imagem 1"
            prepend-icon=""
            append-icon="mdi-camera"
            :rules="obrigatory"
            v-model="form.img_detail1"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-file-input
            filled
            label="Imagem 2"
            prepend-icon=""
            append-icon="mdi-camera"
            :rules="obrigatory"
            v-model="form.img_detail2"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12 px-8">
          <v-file-input
            filled
            label="Imagem 3"
            prepend-icon=""
            append-icon="mdi-camera"
            v-model="form.img_detail3"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row justify="end" class="pr-11 my-3">
        <v-btn color="primary" @click="buttonCallSos()">
          <div>Solicitar SOS</div>
        </v-btn>
      </v-row>
    </v-container>
    <v-container
      v-if="mapping === true"
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
      <div>
        <v-row no-gutters>
          <v-col cols="12 px-8">
            <GmapMap
              :center="center"
              :zoom="17"
              style="width: 100%; height: 550px"
            >
              <GmapMarker
                :position="center"
                :clickable="true"
                :draggable="true"
                @dragend="getMarkerPosition($event.latLng)"
              />
            </GmapMap>
          </v-col>
        </v-row>
      </div>
      <v-row class="mt-1">
        <v-col cols="12 px-8">
          <div class="text-center">
            <v-btn color="success" @click="buttonConfirmPosition()">
              Confirmar localização
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { sosService } from "@/api/sos";
import { ISosCallForm } from "@/types/sos";
import { items } from "@/utils/sos";
import { isValidCPF } from "@/utils/utils";
import { IOrder } from "@/types/sos";

const form: ISosCallForm = {
  id: 0,
  associate_cpf: "",
  associate_name: "",
  service_bike: undefined,
  service_bike_model: "",
  service_bike_brand: "",
  service_type: 0,
  service_text: "",
  service_bike_lane: -1,
  service_ref_location: "",
  img_detail1: undefined,
  img_detail2: undefined,
  img_detail3: undefined,
  associated_coordinates: "",
  service_address: "",
  created_at: "",
  service_status: 0,
};

@Component({
  components: {},
})
export default class Available extends BaseComponent {
  order_open = {} as IOrder;
  items = items;
  formSent = false;
  missingDataDialog = false;
  form = form;
  obrigatory = [(v: string) => !!v || "Campo obrigatório"];
  apiKey = "AIzaSyDkHRIc73aAeYGZrWQ6423o4BTxoNnAGfQ";
  address: any;
  locationConfirmed = false;
  mapping = false;
  cyclistPosition = { lat: 0.0, lng: 0.0 };
  imgLocDefault =
    "https://www.nicepng.com/png/full/10-100907_location-black-black-location-icon-png.png";
  cardText = "Clique aqui para ativar sua localização";
  img_updated = false;

  isValidCPF = isValidCPF;

  //mapa
  options = {
    enableHighAccuracy: true,
  };
  // eslint-disable-next-line
  coords = {} as GeolocationCoordinates;

  // eslint-disable-next-line
  success(position: GeolocationPosition) {
    this.coords = position.coords;
  }
  // eslint-disable-next-line
  error(error: GeolocationPositionError) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  getMarkerPosition(e: any) {
    this.cyclistPosition = { lat: e.lat(), lng: e.lng() };
    this.setLocImage(e.lat(), e.lng());
  }

  async buttonConfirmPosition() {
    this.setLocImage(this.cyclistPosition.lat, this.cyclistPosition.lng);
    this.address = await sosService.getAddress(
      this.cyclistPosition.lat,
      this.cyclistPosition.lng,
      this.apiKey
    );
    this.form.associated_coordinates = `{"lat":"${this.cyclistPosition.lat}","lng":"${this.cyclistPosition.lng}"}`;
    this.locationConfirmed = true;
    this.cardText = this.address.results[0].formatted_address;
    this.form.service_address = this.cardText;
    this.mapping = !this.mapping;
  }

  setLocImage(lat: number, lng: number) {
    this.imgLocDefault = `https://maps.googleapis.com/maps/api/staticmap?\
                          center=${lat},${lng}\
                          &zoom=17&size=400x400\
                          &markers=color:red%7Clabel:C%7C${lat},${lng}\
                          &key=${this.apiKey}`;
    this.img_updated = true;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
  }

  async buttonCallSos() {
    if (this.locationConfirmed == false) {
      this.changeMainDialog({
        msg: "Você precisa enviar sua localização para solicitar o chamado SOS.",
        title: "Localização obrigatória",
        persistent: true,
        active: true,
        bntClose: true,
        btnOkOnly: true,
        msgOk: "OK",
        ident: false,
      });
      return;
    }
    this.sendFormData();
  }

  async sendFormData() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.changeLoading(true);
      const response = await sosService.submitSosForm(this.form);
      this.changeLoading(false);
      if (response.error) {
        this.fail(response);
        return;
      } else {
        this.$router.push({ path: "/sos/waiting/" });
        return response;
      }
    } else {
      this.changeMainDialog({
        msg: "Você precisa preencher todos os campos obrigatórios para realizar o chamado SOS.",
        title: "Campos obrigatórios",
        persistent: true,
        active: true,
        bntClose: true,
        btnOkOnly: true,
        msgOk: "OK",
        ident: false,
      });
    }
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível realizar esta ação",
      title: "Erro",
      persistent: false,
      active: true,
      bntClose: true,
    });
  }

  backButton() {
    this.$router.push({ path: "/sos/" });
  }

  async getOpenOrder() {
    const response = await sosService.getOpenOrder();
    if (!response.error) {
      this.order_open = response;
      this.$router.push({ path: "/sos/waiting/" });
    } else {
      return;
    }
  }

  mapClick() {
    this.mapping = true;
    this.getOpenOrder();
    this.getLocation();
    form.service_bike_lane = Number(this.$route.query.lane_id);
  }

  get center() {
    this.cyclistPosition = {
      lat: this.coords.latitude,
      lng: this.coords.longitude,
    };
    return { lat: this.coords.latitude, lng: this.coords.longitude };
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
  .content-container {
    margin-left: auto;
    margin-top: 30px !important;
    border-radius: 10px;
    background: white;
    max-width: 600px;
  }
}
.title-content {
  font-weight: 500 !important;
  color: $main-dark-color;
}
</style>
