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
      <v-card-text>{{ dialog.msg }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { RootState, MutationTypes, IDialog } from "@/store";

@Component({})
export default class MainDialog extends Vue {
  // dialog = {
  //   msg: "",
  //   active: false,
  //   title: "",
  //   persistent: false,
  //   bntClose: false,
  // };
  @State("dialog") dialog!: IDialog;

  // @Watch("$store.state.dialog.active")
  // onActiveChange(val: boolean, oldVal: boolean) {
  //   this.dialog = (this.$store.state as RootState).dialog;
  // }

  // @Watch("dialog.active")
  // onDialogActiveChange(val: boolean, oldVal: boolean) {
  //   this.$store.commit(MutationTypes.TOGGLE_DIALOG, this.dialog);
  // }
}
</script>
