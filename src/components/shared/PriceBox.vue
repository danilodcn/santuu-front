<template>
  <v-main class="price-box">
    <v-row :class="{ bad: bad, good: good }" class="row-price">
      <slot></slot>
    </v-row>
    <v-row class="row-price">
      <p v-if="numberInstallments > 1">{{ numberInstallments }}x de&nbsp;</p>
      <p :class="{ bold: bold }">
        R$ {{ formatPrice(price / (numberInstallments || 1)) }}
      </p>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { formatPrice } from "@/utils/utils";

@Component
export default class PriceBox extends Vue {
  @Prop() bold!: boolean;
  @Prop() bad!: boolean;
  @Prop() good!: boolean;
  @Prop() price!: number;
  @Prop() numberInstallments!: number;
  formatPrice = formatPrice;
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.bad {
  color: #fb8c00;
}
.good {
  color: $main-dark-color;
}
.bold {
  font-weight: bold;
}
.price-box {
  text-align: center;
  font-size: 18px;
}
@media (max-width: 768px) {
  .price-box {
    font-size: 14px;
  }
}
.row-price {
  justify-content: center;
}
</style>
