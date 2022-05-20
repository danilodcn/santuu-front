<template>
  <v-dialog
    v-model="dialog.active"
    :persistent="dialog.persistent"
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ dialog.title }}
      </v-card-title>
      <v-card-text>{{ dialog.msg }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog.active = false"
          v-if="dialog.bntClose"
        >
          Fechar
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RootState, MutationTypes } from "@/store";

@Component({
  computed: {
    dialog: {
      get() {
        return (this.$store.state as RootState).dialog.active;
      },
    },
  },
})
export default class MainDialog extends Vue {
  dialog = {
    msg: "",
    active: false,
    title: "",
    persistent: false,
    bntClose: false,
  };

  @Watch("$store.state.dialog.active")
  onActiveChange(val: boolean, oldVal: boolean) {
    console.log(val, oldVal);
    this.dialog = (this.$store.state as RootState).dialog;
  }

  @Watch("dialog.active")
  onDialogActiveChange(val: boolean, oldVal: boolean) {
    console.log(val, oldVal);
    this.$store.commit(MutationTypes.TOGGLE_DIALOG, this.dialog);
  }

  get dialogE() {
    return 0;
  }
}
</script>
