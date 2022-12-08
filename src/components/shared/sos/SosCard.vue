<template>
  <v-card>
    <v-card elevation="0">
      <span class="pl-3 grey--text text--darken-4">
        Chamado #{{ data.id }}
      </span>
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
      <v-card-title class="pt-0">
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="8" class="ma-0 pa-0">
              <span
                class="text-body-2 break mx-auto"
                v-text="data.mechanic_name"
              />
            </v-col>
            <v-col class="ma-0 pa-0" v-if="data.rating_service">
              <v-rating
                background-color="grey lighten-2"
                color="warning"
                length="5"
                readonly
                size="18"
                :value="data.rating_service"
                half-increments
              >
              </v-rating>
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="ma-0 pa-0" align="center">
            <v-col cols="6" class="ma-0 pa-0">
              <span
                class="text--center text-body-2"
                color="primary"
                v-text="date"
              />
            </v-col>
            <v-col cols="9" class="ma-0 pa-0">
              <span
                class="text-body-2 break icon-registered"
                v-text="data.service_ref_location"
              />
            </v-col>
            <v-col class="ma-0 pa-0">
              <span
                class="text-body-2 mx-auto"
                color="green"
                v-text="status_name"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card-title>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/utils/utils";
import { BaseComponent } from "@/utils/component";
import { items, getLocImage, order_status_choices } from "@/utils/sos";
import { ISosCallForm } from "@/types/sos";

interface ICardData {
  id: number;
  associate: number;
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
  rating_service: number;
  mechanic_name: string;
  created_at: string;
}

@Component
export default class SosCard extends BaseComponent {
  @Prop() data!: ICardData;

  get service_name(): string {
    return items.find((x) => x.id == this.data.service_type)?.name || "";
  }

  get status_name(): string {
    if (this.data.service_status == 4) {
      return "Finalizado";
    } else if (this.data.service_status == 5) {
      return "Cancelado";
    } else {
      return "";
    }
  }

  get coordinates(): string {
    let coords = JSON.parse(this.data.associated_coordinates);
    return `${coords.lat},${coords.lng}`;
  }

  get date(): string {
    return formatDate(this.data.created_at);
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
