<template>
  <div class="proposal-values">
    <v-card class="box-content">
      <v-row>
        <v-col offset="7">
          <v-btn class="success-santuu" elevation="0">Enviar por email</v-btn>
          <v-btn class="success-santuu" elevation="0">Baixar proposta</v-btn>
        </v-col>
      </v-row>
      <DetailBox :table="table">Resumo da proposta</DetailBox>
      <DetailBox :table="table">Bike</DetailBox>
      <DetailBox :table="table">Coberturas</DetailBox>
      <v-row class="prices">
        <v-col class="col-3">
          <PriceBox :bad="true" price="136.08">Valor do IOF</PriceBox>
        </v-col>
        <v-col class="col-3">
          <PriceBox :bold="true" :good="true" price="136.08"
            >Prêmio a pagar</PriceBox
          >
        </v-col>
        <v-col class="col-3">
          <PriceBox :bold="true" :good="true" price="136.08">Em até</PriceBox>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="back-foward" justify="space-between">
        <v-col class="col-2">
          <v-btn>Voltar</v-btn>
        </v-col>
        <v-col class="col-2">
          <v-btn>Avançar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailBox, {
  IDetailedInfo,
  ITableRow,
} from "@/components/DetailBox.vue"; // @ is an alias to /src
import PriceBox from "@/components/PriceBox.vue"; // @ is an alias to /src

const titles: IDetailedInfo[] = [
  {
    value: "Data de criação da proposta:",
    description: "Detalhe",
  },
  {
    value: "Vigência:",
    description: "Quantidade de calorias (Kcal)",
  },
  {
    value: "Valor total do prêmio:",
    description: "Quantidade de calorias (Kcal)",
  },
  {
    value: "Em até:",
    description: "Quantidade de calorias (Kcal)",
  },
];

const items: ITableRow[] = [
  {
    values: [
      {
        value: "9 de Maio de 2022 às 08:13",
        description: "Bom",
      },
      {
        value: "1 ano de seguro",
        description: "Muita Energia",
      },
      {
        value: "R$ 1979,94",
        description: "Muita Energia",
      },
      {
        value: "12 x R$ 165,00",
        description: "Muita Energia",
      },
    ],
  },
];

const table = {
  titles: titles,
  rows: items,
};

@Component({
  components: {
    DetailBox,
    PriceBox,
  },
})
export default class ProposalValues extends Vue {
  table = table;
}
</script>

<style scoped>
.box-content {
  margin: 30px;
  padding: 50px;
}
.success-santuu {
  color: #4caf50;
  background-color: #fafafa !important;
  margin-left: 20px;
}
.prices {
  margin-top: 60px;
}
.back-foward {
  margin-top: 80px;
}
</style>
