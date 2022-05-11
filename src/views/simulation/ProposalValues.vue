<template>
  <div class="proposal-values">
    <v-card class="box-content">
      <v-btn class="success-santuu" elevation="0">Enviar por email</v-btn>
      <DetailBox :table="table">Resumo da proposta</DetailBox>
      <DetailBox :table="table">Bike</DetailBox>
      <DetailBox :table="table">Coberturas</DetailBox>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailBox, {
  IDetailedInfo,
  ITableRow,
} from "@/components/DetailBox.vue"; // @ is an alias to /src

const titles: IDetailedInfo[] = [
  {
    value: "Name",
    description: "Detalhe",
  },
  {
    value: "Calories",
    description: "Quantidade de calorias (Kcal)",
  },
];

const items: ITableRow[] = [
  {
    values: [
      {
        value: "Frozen Yogurt",
        description: "Bom",
      },
      {
        value: 159,
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
  },
})
export default class ProposalValues extends Vue {
  table = table;

  log() {
    console.log(this.table);
  }
}
</script>

<style scoped>
.box-content {
  margin: 30px;
  padding: 50px;
}
.success-santuu {
  color: #4caf50;
}
</style>
