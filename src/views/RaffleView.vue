<template>
  <v-card>
    <v-container fluid class="pa-4">
      <v-row
        align="center"
        justify-md="space-around"
        justify="center"
        class="mx-md-4 mx-0 py-2"
      >
        <v-img src="@/assets/presente.png" v-bind="imgProps" />
        <span class="text-h4 text-md-h3 mx-5 main-color">Sorteador</span>
        <v-img
          src="@/assets/presente.png"
          id="image-invert"
          v-bind="imgProps"
        />
      </v-row>
    </v-container>
    <v-spacer class="my-2" />
    <v-container fluid class="pa-4">
      <v-container>
        <v-row align-content="center" justify="center" class="mx-auto">
          <v-col cols="8" md="5">
            <v-autocomplete
              filled
              outlined
              label="Selecione o evento"
              item-text="name"
              item-value="id"
              :items="input.event.items"
              v-model="input.event.model"
            />
          </v-col>
          <v-col cols="12" align-self="center" justify="center" align="center">
            <v-btn
              outlined
              color="primary"
              class="mt-n5"
              v-text="input.button.text"
              @click="handleClick"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-divider class="my-2" v-if="input.event" />
    <v-container fluid v-if="input.event">
      <v-col>
        <v-row align="center" justify="center" class="text-h5">
          <span class="main-color pb-1">Sortear</span>
          <v-text-field
            hide-spin-buttons
            type="number"
            class="mx-2 input text-h5"
            v-model="input.number"
            outline
            single-line
            reverse
          />
          <span class="main-color pb-1">Participantes</span>
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
    </v-container>

    <v-divider class="my-3" />

    <v-container fluid v-if="result.show" class="mt-4 py-10">
      <v-row align="center" justify="center" class="text-h5">
        <span class="main-color">{{ result.resultText }}</span>
      </v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-row align="center" justify="center" class="text-h5 my-6">
          <button
            color="primary"
            class="text-h6 mx-2 my-1 result"
            v-for="(item, i) in result.results"
            @click="item.visible = true"
            :class="{ 'bnt-inactive': !item.visible }"
            :key="`result-button-${i}`"
          >
            <span v-text="item.visible ? item.name : `${i + 1}º`" />
          </button>
        </v-row>
      </v-col>

      <v-row align="center" justify="center">
        <v-btn color="primary" class="mx-2" @click="() => {}"
          >Enviar por email</v-btn
        >
        <v-btn color="primary" class="mx-2" @click="() => {}"
          >Salvar resultado</v-btn
        >
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { BaseComponent } from "@/utils/component";
import { IRaffleType, IRaffleTypeAction, raffleHelper } from "@/helper/raffle";
import { Component, Watch } from "vue-property-decorator";
import { VBtn, VAutocomplete } from "vuetify/lib";
import { eventService } from "@/api/bikeEvents";
import { presenceConfirmationService } from "@/api/raffle/presenceConfirmation";
import { getRandomSubscriptionService } from "@/api/raffle/getRandomSubscription";

type IResult = {
  name: string;
  item: any;
  order: number;
  visible: boolean;
};

type IInput = {
  event: {
    model: any;
    items: any[];
  };
  button: { text: string };
  number?: number;
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

  input: IInput = {
    event: { items: [], model: null },
    button: { text: "Liberar" },
    number: undefined,
  };

  result = {
    results: [] as IResult[],
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

  get hasAction(): boolean {
    return Boolean(this.action);
  }
  async created() {
    console.log("ao criar");

    this.input.event.items = await eventService.getEvent({});
  }
  @Watch("raffleType")
  async onTypeChange(value: IRaffleType) {
    if (value && value.type) {
      this.changeLoading(true);
      this.action = await raffleHelper.getAction(value.type);
      this.changeLoading(false);
    }
  }

  getId(event: any | number): number {
    if (typeof event == "number") {
      return event;
    }
    return event.id;
  }

  async handleClick() {
    this.changeLoading(true);
    console.log(this.input.event.model);

    const id = this.getId(this.input.event.model);
    const result = await presenceConfirmationService.event({
      eventID: id,
    });
    this.changeLoading(false);
    // = await component.onClick(this.action);

    console.log(result);

    // if (result.error) {
    //   this.changeMainLDialog({
    //     active: true,
    //     bntClose: true,
    //     msg: result.message || "",
    //     persistent: false,
    //     title: "Houve um erro",
    //   });
    // }
  }

  async getResults() {
    const result = await raffleHelper.getRandomSubscriptions({
      eventID: this.input.event.model,
      number: this.input.number || 1,
    });

    console.log(result, "result");

    if (result?.error) {
      this.changeMainLDialog({
        active: true,
        bntClose: true,
        msg: result.message || "",
        persistent: false,
        title: "Houve um erro",
      });
      return [];
    }
    const results: IResult[] = [];
    result?.responses?.forEach((item) => {
      results.push({
        ...item,
        visible: this.result.showResults,
      });
    });
    return results;
  }

  async handleResult() {
    this.changeLoading(true);
    this.result.results = await this.getResults();
    this.result.show = Boolean(this.result.results.length > 0);
    this.result.resultText =
      this.result.results.length < 2
        ? this.action.resultText
        : this.action.verboseResultText;

    this.result.results.forEach((item) => {
      item.visible = !this.result.showResults;
    });
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
.bnt-inactive {
  background-color: $main-dark-color;
  color: white;
}

button.result {
  border-radius: 50%;
  border: 2px solid $main-dark-color;
  width: 80px;
  height: 80px;
}

#image-invert {
  transform: rotateY(180deg);
}
</style>
