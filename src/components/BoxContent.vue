<template>
  <v-card class="sad" elevation="10">
    sadasdsadas
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BoxContent extends Vue {}
</script>

<style scoped>
.sad {
  font-family: Poppins;
  background-color: red;
}
</style>
