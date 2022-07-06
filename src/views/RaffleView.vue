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
        <v-row align-content="center" justify="center" class="mx-auto">
          <v-col cols="12" md="5">
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
          <template v-if="action">
            <v-col
              v-for="(component, i) in action.additionalComponents"
              :key="i"
              v-bind="component.containerProps"
            >
              <keep-alive>
                <component
                  :is="component.component"
                  v-bind="component.props"
                  v-model="component.model"
                  @click="handleClick(i)"
                  >{{ component.text }}
                </component>
              </keep-alive>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-card>
    <v-spacer class="my-4" />
    <v-card>
      <v-container fluid v-if="action">
        <v-col>
          <v-row align="center" justify="center" class="text-h5">
            <span class="main-color pb-1">Sortear</span>
            <v-text-field
              hide-spin-buttons
              type="number"
              class="mx-2 input text-h5"
              v-model="raffleModel.number"
              outline
              single-line
              reverse
            />
            <span class="main-color pb-1">{{ optionsName(2) }}</span>
          </v-row>

          <v-row align="center" justify="center" class="text-h5">
            <span class="main-color pb-1">Entre</span>
            <v-text-field
              hide-spin-buttons
              type="number"
              v-model="raffleModel.min"
              class="mx-2 input text-h5"
              outline
              single-line
              reverse
            />
            <span class="main-color pb-1">e</span>
            <v-text-field
              hide-spin-buttons
              type="number"
              v-model="raffleModel.max"
              class="mx-2 input text-h5"
              outline
              single-line
              reverse
            />
          </v-row>

          <v-row align="center" justify="center">
            <v-checkbox
              v-model="result.showResults"
              label="Visualizar resultado somente ao clicar"
            />
          </v-row>
          <v-row align="center" justify="center">
            <v-btn color="primary" outlined @click="handleResult()"
              >Sortear</v-btn
            >
          </v-row>
        </v-col>
        <v-spacer class="my-6" />
      </v-container>
    </v-card>

    <v-card v-if="result.show" class="mt-4 py-10">
      <v-row align="center" justify="center" class="text-h5">
        <span class="main-color">{{ result.resultText }}</span>
      </v-row>
      <v-row align="center" justify="center" class="text-h5 my-6">
        <v-btn
          icon
          rounded
          outlined
          fab
          color="primary"
          class="text-h6"
          v-for="(item, i) in result.results"
          @click="item.visible = false"
          :class="{ 'bnt-active': item.visible }"
          :key="`result-button-${i}`"
          v-text="item.visible ? '' : item.name"
        />
      </v-row>

      <v-row align="center" justify="center">
        <v-btn color="primary" class="mx-2" @click="() => {}"
          >Enviar por email</v-btn
        >
        <v-btn color="primary" class="mx-2" @click="() => {}"
          >Salvar resultado</v-btn
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { IEvent } from "@/types/events";
import { BaseComponent } from "@/utils/component";
import { IRaffleType, IRaffleTypeAction, raffleHelper } from "@/helper/raffle";
import { Component, Watch } from "vue-property-decorator";
import { getRandomSubscriptionService } from "@/api/raffle/getRandomSubscription";
import { VBtn, VAutocomplete } from "vuetify/lib";

type IResult = {
  name: string;
  item: any;
  order: number;
  visible: boolean;
};

@Component({
  components: { VBtn, VAutocomplete },
})
export default class RaffleView extends BaseComponent {
  raffleType: IRaffleType | null = null;
  action = {} as IRaffleTypeAction;

  raffleModel = {
    number: undefined,
    min: undefined,
    max: undefined,
  };

  result = {
    results: [{ item: 2, name: "2", order: 0, visible: false }] as IResult[],
    show: false,
    showResults: true,
    resultText: "",
  };

  get imgProps() {
    return raffleHelper.imgProps;
  }

  get types() {
    return raffleHelper.raffleTypes;
  }

  @Watch("raffleType")
  async onTypeChange(value: IRaffleType) {
    if (value && value.type) {
      this.changeLoading(true);
      this.action = await raffleHelper.getAction(value.type);
      this.changeLoading(false);
    }
  }

  optionsName(n: number) {
    return n < 2 ? this.action.memberName : this.action.verboseMemberName;
  }

  async handleClick(index: number) {
    const component = this.action.additionalComponents?.find(
      (_, i) => i == index
    );
    if (component) {
      this.changeLoading(true);
      const result = await component.onClick(this.action);
      this.changeLoading(false);

      if (result.error) {
        this.changeMainLDialog({
          active: true,
          bntClose: true,
          msg: result.message || "",
          persistent: false,
          title: "Houve um erro",
        });
      }
    }
  }

  async getResults() {
    const result = await this.action.execute(this.raffleModel);
    if (result.error) {
      this.changeMainLDialog({
        active: true,
        bntClose: true,
        msg: result.message || "",
        persistent: false,
        title: "Houve um erro",
      });
    }
    this.result.results = [];
    result.responses?.forEach((item) => {
      this.result.results.push({
        ...item,
        visible: this.result.showResults,
      });
    });
  }

  async handleResult() {
    this.changeLoading(true);
    this.result.show = false;
    this.getResults();
    // setTimeout(() => {
    //   this.result.show = true;
    //   this.changeLoading(false);
    // }, 300);

    this.result.resultText =
      this.result.results.length < 2
        ? this.action.resultText
        : this.action.verboseResultText;

    this.result.results.forEach((item) => {
      item.visible = this.result.showResults;
    });

    this.result.show = true;
    this.changeLoading(false);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.main-color {
  color: $main-dark-color;
}

.input {
  max-width: 4rem;
}
.bnt-active {
  background-color: $main-dark-color;
}
</style>
