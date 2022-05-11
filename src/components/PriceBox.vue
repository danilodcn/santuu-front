<template>
  <v-content class="price-box">
    <v-row :class="{ bad: bad, good: good }">
      <slot></slot>
    </v-row>
    <v-row>
      <b :class="{ bold: bold }">R$ {{ price }}</b>
    </v-row>
  </v-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PriceBox extends Vue {
  @Prop() bold!: boolean;
  @Prop() bad!: boolean;
  @Prop() good!: boolean;
  @Prop() price!: number;
}
</script>

<style scoped>
.bad {
  color: #fb8c00;
}
.good {
  color: #4caf50;
}
.bold {
  font-weight: bold;
}
.price-box {
  font-size: 20px;
  margin: 80px 30px 30px 30px;
}
</style>
