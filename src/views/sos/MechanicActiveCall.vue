<template>
  <v-form>
    <v-container class="content-container mt-4 mt-md-3 px-7">
      <v-toolbar color="transparent" flat>
        <v-btn icon light @click.prevent="">
          <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          Chamado SOS
        </v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 12 : 2">
              <v-img
                lazy-src="https://i.insider.com/583ae70bba6eb620008b64cc?width=1200&format=jpeg"
                max-height="150"
                max-width="352.53"
                src="https://i.insider.com/583ae70bba6eb620008b64cc?width=1200&format=jpeg"
              ></v-img>
              <v-card-text class="mx-0">
                Rua Tiradentes, número 1, Centro
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col col="12" md="4">
          <v-card class="mx-auto" max-width="400" tile>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Ciclista:</v-list-item-subtitle>
                <v-list-item-title>{{ associate_name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Marca da bike:</v-list-item-subtitle>
                <v-list-item-title>{{ bike_brand }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Modelo da bike:</v-list-item-subtitle>
                <v-list-item-title>{{ bike_model }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Tipo de serviço:</v-list-item-subtitle>
                <v-list-item-title> {{ service_type }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Obs.:</v-list-item-subtitle>
                <v-list-item-title>{{ service_text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-between" class="mx-1">
        <v-btn color="success" align="right" @click.stop="dialog = true">
          <div v-if="callStatus === 'caminho'">Cheguei no local</div>
          <div v-if="callStatus === 'finalizando'">Finalizar</div>
        </v-btn>
        <v-btn color="primary"> Chat </v-btn>
      </v-row>
      <v-row>
        <v-col cols="6" md="1" class="align-md-content-end">
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-text class="pa-5">
                <div v-if="callStatus === 'caminho'">
                  Você confirma que chegou no local?
                </div>
                <div v-else-if="callStatus === 'finalizando'">
                  Você confirma que finalizou o chamado?
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="red darken-1"
                  text
                  @click="confirmPosition(false)"
                >
                  Não
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="confirmPosition(true)"
                >
                  Sim
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { IEvent } from "@/types/events";
import { sosService } from "@/api/sos";
import { ISosCallForm } from "@/types/sos";

const form: ISosCallForm = {
  associate_cpf: "",
  service_bike: undefined,
  service_bike_model: "",
  service_bike_brand: "",
  service_type: 1,
  service_text: "",
  service_bike_lane: 4,
  service_ref_location: "",
  img_detail1: undefined,
  img_detail2: undefined,
  img_detail3: undefined,
};

@Component({
  components: { EventCard },
})
export default class Available extends Vue {
  associate_name = "";
  bike_model = "";
  bike_brand = "";
  cpf = "000.000.000-00";
  reference_point = "";
  service_type = 1;
  service_text = "";
  dialog = false;
  callStatus = "caminho";
  order_data = {} as ISosCallForm;

  confirmPosition(confirm: boolean) {
    if (confirm == true) {
      this.dialog = false;
      this.callStatus = "finalizando";
    } else {
      this.dialog = false;
    }
  }

  async getOpenOrder() {
    this.order_data = await sosService.getOpenOrder();
    console.log(this.order_data);
    this.associate_name = "";
    this.bike_brand = this.order_data.service_bike_brand;
    this.bike_model = this.order_data.service_bike_model;
    this.service_type = this.order_data.service_type;
    this.service_text = this.order_data.service_text;
  }

  created() {
    this.getOpenOrder();
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
