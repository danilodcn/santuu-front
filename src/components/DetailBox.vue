<template>
  <v-content>
    <h3><slot></slot></h3>
    <v-simple-table class="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in table.titles" :key="item.value">
              {{ item.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in table.rows" :key="i">
            <td v-for="sub_item in item.values" :key="sub_item.value">
              {{ sub_item.value }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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
}

@Component
export default class DetailedBox extends Vue {
  @Prop() table!: ITable[];
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
</style>
