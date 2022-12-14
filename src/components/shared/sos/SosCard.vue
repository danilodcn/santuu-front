<template>
  <v-card>
    <v-card-title> Chamado #{{ data.id }} </v-card-title>
    <v-responsive :aspect-ratio="16 / 8">
      <v-col class="pt-0 pb-0">
        <iframe
          :src="`https://maps.google.com/maps?q=${coordinates}&amp;hl=ptbr;z=16.25&amp;output=embed`"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          height="300"
          width="100%"
        ></iframe>
      </v-col>
    </v-responsive>
    <v-card-text class="pt-0">
      <v-row class="ma-0 pa-0">
        <v-col cols="8" class="ma-0 pa-0">
          <span class="text-body-2 break mx-auto">{{
            user_type == 98
              ? `Mecânico: ${data.mechanic_name}`
              : `Ciclista: ${data.associate_name}`
          }}</span>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 pb-2">
        <v-col class="ma-0 pa-0" v-if="parseFloat(data.rating_service)">
          <v-rating
            background-color="grey lighten-2"
            color="warning"
            length="5"
            readonly
            size="18"
            :value="parseFloat(data.rating_service)"
            half-increments
          >
          </v-rating>
        </v-col>
        <v-col class="ma-0 pa-0" v-else>
          <span class="text-body-2" v-text="'Não avaliado'"
        /></v-col>
      </v-row>
      <v-divider />
      <v-row class="ma-0 pa-0 pt-2" align="center">
        <v-col cols="12" class="ma-0 pa-0">
          <span class="text--center text-body-2" color="primary"
            >{{ status_date_text }} em: {{ date }}</span
          >
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0" align="center">
        <v-col cols="9" class="ma-0 pa-0">
          <span
            class="text-body-2 break icon-registered"
            v-text="service_name"
          />
        </v-col>
        <v-col class="ma-0 pa-0">
          <span
            class="text-body-2"
            :class="status_color"
            v-text="status_name"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/utils/utils";
import { BaseComponent } from "@/utils/component";
import { items, getLocImage, order_status_choices } from "@/utils/sos";
import { ISosCallForm } from "@/types/sos";
import { user_types } from "@/utils/sos";
import { UserDataService } from "@/api/userData";

interface ICardData {
  id: number;
  associate: number;
  associate_name: string;
  service_bike: number;
  service_bike_model: string;
  service_bike_brand: string;
  service_type: number;
  service_text: string;
  service_bike_lane: number;
  service_ref_location: string;
  mechanic: number;
  service_status: number;
  service_protocol: string;
  status_text: string;
  associated_coordinates: string;
  rating_service: string;
  mechanic_name: string;
  finish_date: string;
}

const userDataService = new UserDataService();

@Component
export default class SosCard extends BaseComponent {
  @Prop() data!: ICardData;

  status_color = "";
  status_date_text = "";
  profile = {} as any;
  user_types = user_types;
  user_type = -1;

  get service_name(): string {
    return items.find((x) => x.id == this.data.service_type)?.name || "";
  }

  get status_name(): string {
    if (this.data.service_status == 4) {
      this.status_color = "green--text";
      this.status_date_text = "Finalizado";
      return "Finalizado";
    } else if (this.data.service_status == 5) {
      this.status_color = "red--text";
      this.status_date_text = "Cancelado";
      return "Cancelado";
    } else {
      this.status_color = "";
      return "Pendente";
    }
  }

  async getProfile() {
    const response = await userDataService.getUserProfile();
    if (!response.error) {
      this.profile = response;
      this.user_type =
        this.data.associate == this.profile.personal_info?.user
          ? this.user_types.cyclist
          : this.user_types.mechanic;
    } else {
      return;
    }
  }

  get coordinates(): string {
    let coords = JSON.parse(this.data.associated_coordinates);
    return `${coords.lat},${coords.lng}`;
  }

  get date(): string {
    return formatDate(this.data.finish_date);
  }

  created() {
    this.getProfile();
  }
}
</script>

<style scoped>
.icon-registered {
  margin-top: 20px !important;
}
.break {
  min-width: none;
  word-break: break-word;
}
</style>
