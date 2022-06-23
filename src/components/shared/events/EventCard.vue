<template>
  <v-card :to="'/bike-events/event?event_id=' + data.id.toString()">
    <v-img
      :src="data.url"
      :alt="`imagem do evento ${data.name}`"
      height="150"
    ></v-img>
    <v-card-title>
      <v-col class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          <v-col cols="10" class="name ma-0 pa-0">
            <span class="text-body-2 break mx-auto" v-text="data.name" />
          </v-col>
          <v-col
            cols="2"
            class="ma-auto pa-0 text-center mt-n1"
            v-if="data.registered"
          >
            <v-icon color="primary">mdi-check-circle</v-icon>
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="ma-0 pa-0" align="center">
          <v-col cols="2" align-self="center">
            <v-icon color="primary">mdi-calendar</v-icon>
          </v-col>
          <v-col>
            <span
              class="text--center break mx-auto text-body-2"
              v-text="date"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { formatDate } from "@/utils/utils";

interface ICardData {
  id: string;
  url: string;
  name: string;
  final_date: string;
  registered: boolean;
}

@Component
export default class EventCard extends Vue {
  @Prop() data!: ICardData;

  get date(): string {
    return formatDate(this.data.final_date);
  }
}
</script>

<style scoped>
.name {
  line-height: 20px;
  overflow: hidden;
  height: 50px;
}
.break {
  min-width: none;
  word-break: break-word;
}
</style>
