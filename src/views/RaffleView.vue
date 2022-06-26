<template>
  <v-container fluid>
    <v-card class="pa-4">
      <v-row
        align="center"
        justify-md="space-around"
        justify="center"
        class="mx-md-4 mx-0 py-2"
      >
        <v-img src="@/assets/presente.png" v-bind="imgProps" />
        <span class="text-h4 text-md-h3 mx-5 main-color">Sorteador</span>
        <v-img src="@/assets/presente.png" v-bind="imgProps" />
      </v-row>
    </v-card>
    <v-spacer class="my-4" />
    <v-card class="pa-4">
      <v-container>
        <v-row align-content="center">
          <v-col>
            <v-combobox
              filled
              outlined
              label="Tipo de sorteio"
              :items="types"
              :readonly="types.length == 0"
              item-text="name"
              v-model="raffleType"
            ></v-combobox>
          </v-col>
          <v-col v-if="action && action.adicionalField">
            <component
              :is="action.adicionalField.component"
              v-bind="props.field"
            />
          </v-col>
          <v-col v-if="action && action.adicionalAction">
            <component
              :is="action.adicionalAction.component"
              v-bind="props.action"
              v-text="action.adicionalAction.text"
            />
          </v-col>
        </v-row>
      </v-container>
      <pre>{{ action }}</pre>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { IEvent } from "@/types/events";
import { BaseComponent } from "@/utils/component";
import { IRaffleType, IRaffleTypeAction, raffleHelper } from "@/utils/raffle";
import { Component, Watch } from "vue-property-decorator";
import { VBtn, VAutocomplete } from "vuetify/lib";

@Component({
  components: { VBtn, VAutocomplete },
})
export default class RaffleView extends BaseComponent {
  raffleType: IRaffleType | null = null;
  action!: IRaffleTypeAction;
  events!: IEvent[];
  props = {
    action: [] as any[],
    field: [] as any[],
  };

  get imgProps() {
    return raffleHelper.imgProps;
  }

  get types() {
    return raffleHelper.raffleTypes;
  }

  async created() {
    if (this.types.length != 0) {
      this.raffleType = this.types[0];
      this.action = raffleHelper.getAction(this.raffleType.type);
    }
    console.log(this.events);
    this.getPropsActions();
  }

  @Watch("raffleType")
  onTypeChange(value: IRaffleType) {
    this.action = raffleHelper.getAction(value.type);
    this.getPropsActions();
  }

  async getPropsActions() {
    const props = await this.action.adicionalField?.getProps();
    if (props) {
      this.props.field = props;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.main-color {
  color: $main-dark-color;
}
</style>
