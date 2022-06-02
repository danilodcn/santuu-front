<template>
  <v-dialog
    v-model="dialog.active"
    :persistent="dialog.persistent"
    max-width="290"
  >
    <v-card>
      <v-card-actions>
        <v-card-title class="text-h5 lighten">
          {{ dialog.title }}
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          fab
          small
          text
          color="red"
          @click="dialog.active = false"
          v-if="dialog.bntClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text id="dialog">{{ dialog.msg }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { RootState, IDialog } from "@/store";

@Component({})
export default class MainDialog extends Vue {
  @State((state: RootState) => state.dialog) dialog!: IDialog;
}
</script>

<style lang="scss" scoped>
#dialog {
  text-align: justify;
  text-indent: 10px;
}
</style>
