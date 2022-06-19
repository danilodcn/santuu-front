<template>
  <v-list rounded border-radius="4px">
    <v-list-item-group
      v-model="selected"
      @change="sendEvent"
      v-bind="getProps()"
    >
      <template v-for="(item, i) in items">
        <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

        <v-list-item
          v-else
          :key="`item-${i}`"
          :value="item"
          active-class="primary--text text--accent-4"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary accent-4"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item" />
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SelectBox extends Vue {
  selected: any = [];

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
}
</script>

<style></style>
