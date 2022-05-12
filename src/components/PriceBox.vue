<template>
  <v-content class="price-box">
    <v-row :class="{ bad: bad, good: good }">
      <slot></slot>
    </v-row>
    <v-row>
      <p v-if="numberInstallments > 1">{{ numberInstallments }}x de&nbsp;</p>
      <p :class="{ bold: bold }">R$ {{ priceFormated(price) }}</p>
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
  @Prop() numberInstallments!: number;

  priceFormated(price: number): string {
    return Number(price).toFixed(2);
  }
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
