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
          <v-btn color="primary" outlined @click="handleResult(true)"
            >Sortear</v-btn
          >
        </v-row>
      </v-col>
    </v-container>

    <v-divider class="my-3" />
    <v-container fluid v-if="result.show" class="mt-4 py-10">
      <v-col>
        <v-row align="center" justify="center" class="text-h5">
          <span class="main-color">Resultados</span>
        </v-row>
        <v-col sm="6" align-self="center" justify="center" class="mx-auto">
          <v-row
            align="center"
            justify="space-between"
            class="text-h5 my-6"
            v-for="(item, i) in result.results"
            :key="`row-${i}`"
          >
            <span class="main-color mr-auto">#{{ item.round }}</span>
            <v-col align-self="auto">
              <v-row align="center" justify="end" class="mr-auto">
                <button
                  color="primary"
                  class="text-h6 mx-2 my-1 result"
                  v-for="(winner, j) in item.winners"
                  @click="winner.visible = true"
                  :class="{ 'bnt-inactive': !winner.visible }"
                  :key="`result-button-${j}`"
                >
                  <span
                    v-text="
                      winner.visible
                        ? winner.subscriptionNumber
                        : `${winner.count}º`
                    "
                  />
                </button>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { BaseComponent } from "@/utils/component";
import { raffleHelper } from "@/helper/raffle";
import { Component, Watch } from "vue-property-decorator";
import { VBtn, VAutocomplete } from "vuetify/lib";
import { eventService } from "@/api/bikeEvents";
import { presenceConfirmationService } from "@/api/raffle/presenceConfirmation";

type Winner = {
  order: number;
  subscriptionNumber: number;
  visible: boolean;
  count: number;
};

type IResult = {
  name: string;
  item: any;
  winners: Winner[];
  round: number;
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
    showResults: false,
    resultText: "",
  };

  get imgProps() {
    return raffleHelper.imgProps;
  }

  async created() {
    this.input.event.items = await eventService.getEvent({});
  }

  @Watch("input.event.model")
  onEventChange(val: any) {
    this.handleResult(false);
  }

  getId(event: any | number): number {
    if (typeof event == "number") {
      return event;
    }
    return event.id;
  }

  async handleClick() {
    this.changeLoading(true);
    const id = this.getId(this.input.event.model);
    const result = await presenceConfirmationService.event({
      eventID: id,
    });
    this.changeLoading(false);

    if (!result.hasActivePresenceConfirmation) {
      this.changeMainLDialog({
        active: true,
        bntClose: true,
        msg: "Houve um erro ao realizar a ação",
        persistent: false,
        title: "Houve um erro",
      });
      console.log(result);
    }
  }

  async getResults(generateRaffle: boolean) {
    const result = await raffleHelper.getRaffleSubscriptions({
      eventID: this.input.event.model,
      number: this.input.number || 1,
      generateRaffle,
    });

    if (result?.error) {
      this.changeMainLDialog({
        active: true,
        bntClose: true,
        msg: result.message || "",
        persistent: false,
        title: "Houve um erro",
      });
      return { error: true };
    }
    const results: IResult[] = [];
    let i = 0;
    result?.responses?.forEach((item) => {
      const winners: Winner[] = item.winners.map((winner) => {
        i++;
        return {
          ...winner,
          visible: !this.result.showResults,
          count: i,
        };
      });

      results.push({
        ...item,
        winners,
      });
    });
    return { error: false, results };
  }

  async handleResult(generateRaffle = false) {
    this.changeLoading(true);
    const results = await this.getResults(generateRaffle);
    console.log(results, "results");
    if (!results.error) {
      this.result.results = results.results || [];
      this.result.show = Boolean(results?.results?.length);
      this.result.resultText = "Resultado";
    }

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
