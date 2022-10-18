<template>
  <v-dialog v-model="active" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="info-button"
        color="primary"
        fab
        small
        text
        v-bind="attrs"
        v-on="on"
      >
        <slot />
      </v-btn>
    </template>
    <v-card class="body">
      <v-card-title class="text-subtitle-1">
        <v-row justify="center" align="center">
          <p class="title">
            {{ title }}
          </p>
          <v-spacer></v-spacer>
          <v-btn fab small text color="red" @click="active = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text v-if="text" class="text-body-1" v-text="text" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InfoDialog extends Vue {
  active = false;

  @Prop({ required: false }) title!: string;
  @Prop({ required: false }) text!: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

.title {
  max-width: 90%;
}
.text-subtitle-1 {
  background-color: #f7f7f7;
}
.text-body-1 {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.text-body-1::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.text-body-1 {
  padding: 5px 50px 25px 50px !important;
  text-align: justify;
  text-indent: 10px;
  margin-top: 20px;
  max-height: 300px;
  overflow: scroll;
}
</style>
