<template>
  <v-dialog
    v-model="dialog.active"
    :persistent="dialog.persistent"
    max-width="500"
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
      <v-card-text
        id="dialog"
        :class="{ ident: dialog.ident, 'pb-10': dialog.termsAndConditions }"
        v-html="dialog.msg"
        class="px-10"
      ></v-card-text>
      <div v-if="dialog.termsAndConditions">
        <v-divider></v-divider>
        <v-checkbox
          class="pl-10"
          v-model="check"
          label="Declaro que li e aceito os termos e condições."
        >
        </v-checkbox>
      </div>
      <v-row class="px-0 mx-0 py-4" justify="end">
        <v-btn
          class="col-6"
          small
          text
          color="red"
          @click="response(false, dialog.afterFunction)"
          v-if="dialog.btnOkCancel && !dialog.btnOkOnly"
        >
          {{ dialog.msgCancel }}
        </v-btn>
        <v-btn
          v-show="check || !dialog.termsAndConditions"
          class="col-6"
          small
          text
          color="primary"
          @click="response(true, dialog.afterFunction)"
          v-if="dialog.btnOkCancel || dialog.btnOkOnly"
        >
          {{ dialog.msgOk }}
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { RootState, MutationTypes, IDialog } from "@/store";

@Component({})
export default class MainDialog extends Vue {
  @State((state: RootState) => state.dialog) dialog!: IDialog;
  check = false;

  response(
    value: boolean,
    afterFunction: any | ((value: boolean) => any) = undefined
  ) {
    if (afterFunction != undefined) {
      afterFunction(value);
    }

    this.check = false;
    this.dialog.active = false;
    this.dialog.termsAndConditions = false;
    this.dialog.btnOkCancel = false;
    this.dialog.isResponseOk = value;
    this.$store.commit(MutationTypes.CHANGE_COVERAGES, this.dialog);
  }
}
</script>

<style lang="scss" scoped>
#dialog {
  text-align: justify;
}
.ident {
  text-indent: 10px;
}
</style>
<style lang="scss">
.v-dialog {
  overflow: visible !important;
}
</style>
