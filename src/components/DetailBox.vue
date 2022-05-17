<template>
  <v-main>
    <h3><slot></slot></h3>
    <v-simple-table class="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in table.titles" :key="item.value">
              {{ item.value }}
              <InfoDialog v-if="item.description" :text="item.description">
                <v-icon small color="gray">mdi-information</v-icon>
              </InfoDialog>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in table.rows" :key="i">
            <td
              :style="{
                width: widthCell,
                padding: `${table.padding}px !important`,
              }"
              v-for="sub_item in item.values"
              :key="sub_item.value"
              v-html="sub_item.value"
            ></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";

export interface IDetailedInfo {
  value: string | number;
  description: string;
}

export interface ITableRow {
  values: IDetailedInfo[];
}

interface ITable {
  titles: ITableRow;
  rows: ITableRow[];
  padding: number;
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class DetailedBox extends Vue {
  @Prop() table!: ITable;
  widthCell!: string;
  collumnsNumber!: number;

  created() {
    if (this.collumnsNumber) {
      this.widthCell = `${(1 / this.collumnsNumber) * 100}%`;
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: left;
  padding: 30px 30px 10px 30px;
  color: #4caf50;
}
.table {
  background-color: #fcfcfc !important;
}
td,
th {
  text-align: center !important;
}
</style>
