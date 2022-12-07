<template>
  <v-card>
    <v-card elevation="0">
      <v-responsive :aspect-ratio="16 / 8">
        <v-col>
          <iframe
            :src="`https://maps.google.com/maps?q=${data.coordinates}&amp;hl=ptbr;z=16.25&amp;output=embed`"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            height="300"
            width="100%"
          ></iframe>
        </v-col>
      </v-responsive>
      <v-card-title>
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="8" class="ma-0 pa-0">
              <span
                class="text-body-2 break mx-auto"
                v-text="data.mechanic_name"
              />
            </v-col>
            <v-col class="ma-0 pa-0" v-if="data.rating">
              <v-rating
                background-color="grey lighten-2"
                color="warning"
                length="5"
                readonly
                size="18"
                :value="data.rating"
                half-increments
              >
              </v-rating>
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="ma-0 pa-0" align="center">
            <v-col cols="4" class="ma-0 pa-0">
              <span
                class="text--center text-body-2"
                color="primary"
                v-text="get_date()"
              />
            </v-col>
            <v-col cols="10" class="ma-0 pa-0">
              <span
                class="text-body-2 icon-registered"
                v-text="data.service_ref_location"
              />
            </v-col>
            <v-col class="ma-0 pa-0">
              <span
                class="text-body-2 break mx-auto"
                color=""
                v-text="data.service_status"
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
  coordinates: string;
  rating: number;
  mechanic_name: string;
  date: string;
}

@Component
export default class SosCard extends BaseComponent {
  @Prop() data!: ICardData;

  get_date(): string {
    return formatDate(this.data.date);
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
