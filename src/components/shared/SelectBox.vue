<template>
  <v-container fluid>
    <v-checkbox
      v-for="(item, i) in items"
      :key="`item-${i}`"
      :label="item"
      :value="item"
      v-model="selected"
      v-bind="getProps()"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component
export default class SelectBox extends Vue {
  @Prop() items!: any[];

  getProps() {
    return {
      ...this.$attrs,
      ...this.$props,
    };
  }

  sendEvent(values: any[]) {
    this.$emit("input", values);
  }

  @VModel({ default: [] }) selected!: any;
}
</script>

<style></style>
