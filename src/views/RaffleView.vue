<template>
  <v-container fluid>
    <v-card>
      <v-row align="center" justify="space-around">
        <v-img src="@/assets/presente.png" v-bind="imgProps" />
        <span class="text-h3 mx-5">Sorteador</span>
        <v-img src="@/assets/presente.png" v-bind="imgProps" />
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { BaseComponent } from "@/utils/component";

export default class RaffleView extends BaseComponent {
  get imgProps() {
    const height = 100;
    return {
      "max-width": height,
      "max-height": height,
      "aspect-ratio": 1,
      height: height,
    };
  }
}
</script>

<style></style>
