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
.block {
  width: 100%;
}
.good {
  color: $main-dark-color;
}
.bold {
  font-weight: bold;
}
.price-box {
  padding-top: 15px !important;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  background-color: #fdfdfd;
  text-align: center;
}
.price-box:hover {
  background-color: #f2f2f2;
}
.row-price {
  align-items: center;
  justify-content: center;
}
</style>
