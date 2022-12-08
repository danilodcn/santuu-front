<template>
  <v-card>
    <v-card
      elevation="0"
      :to="'/sos/form/?lane_id=' + (data.id || -1).toString()"
      :disabled="!data.active"
    >
      <v-responsive :aspect-ratio="16 / 9">
        <v-img
          class="img"
          :src="data.url_card"
          :alt="`imagem da ciclovia ${data.lane_name}`"
        ></v-img>
      </v-responsive>
      <v-card-title>
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="10" class="name ma-0 pa-0">
              <span
                class="text-body-2 break mx-auto"
                v-text="data.lane_name"
              /><br />
              <span class="caption break mx-auto" v-text="data.description" />
            </v-col>
            <v-col
              cols="2"
              class="ma-0 pa-0 text-center icon-active"
              v-if="data.active"
            >
              <v-icon color="primary" size="16">mdi-check-circle</v-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-card-title>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";

interface ICardData {
  id?: number;
  lane_name: string;
  description: string;
  active: boolean;
  state: string;
  city: string;
  url_map_location: string;
  hours: any;
  url_card?: string;
}

@Component
export default class LaneCard extends BaseComponent {
  @Prop() data!: ICardData;
}
</script>

<style scoped>
.icon-active {
  margin-top: -6px !important;
}
.name {
  line-height: 20px;
  overflow: hidden;
  height: 50px;
}
.break {
  min-width: none;
  word-break: break-word;
}
.img {
  width: 100%;
  height: 100%;
}
</style>
