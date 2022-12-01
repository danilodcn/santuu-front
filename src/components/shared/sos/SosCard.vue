<template>
  <v-card>
    <v-card elevation="0">
      <v-responsive :aspect-ratio="10 / 10">
        <v-col>
          <iframe
            class="poster"
            :src="`https://maps.google.com/maps?q=${data.coordinates}&amp;hl=ptbr;z=25.16&amp;output=embed`"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            height="100%"
            width="100%"
          ></iframe>
        </v-col>
      </v-responsive>
      <v-card-title>
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="10" class="name ma-0 pa-0">
              <span class="text-body-2 break mx-auto" v-text="data.mechanic" />
            </v-col>
            <v-col
              cols="2"
              class="ma-0 pa-0 text-center icon-registered"
              v-if="data.service_protocol"
            >
              <v-icon color="primary" size="16">mdi-check-circle</v-icon>
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="ma-0 pa-0" align="center">
            <v-col cols="2" align-self="center">
              <v-icon color="primary">mdi-calendar</v-icon>
            </v-col>
            <v-col>
              <span class="text--center mx-auto text-body-2" v-text="date" />
            </v-col>
            <v-col cols="10" class="name ma-0 pa-0">
              <span
                class="text-body-2 break mx-auto"
                v-text="data.service_ref_location"
              />
            </v-col>
            <v-col class="name ma-0 pa-0">
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
}

@Component
export default class SosCard extends BaseComponent {
  @Prop() data!: ICardData;

  get date(): string {
    return formatDate("2022-10-03 19:35:35.993822");
  }
}
</script>

<style scoped>
.icon-registered {
  margin-top: -6px !important;
}
.break {
  min-width: none;
  word-break: break-word;
}
.poster {
  width: 100%;
  height: 100%;
}
</style>
