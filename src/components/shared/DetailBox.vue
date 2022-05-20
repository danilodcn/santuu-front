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
                <v-icon small>mdi-information</v-icon>
              </InfoDialog>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in table.rows" :key="i">
            <td
              :style="{
                width: widthCell,
                padding: `${table.padding}px 10px ${table.padding}px 10px !important`,
              }"
              v-for="sub_item in item.values"
              :key="sub_item.value"
            >
              <span>
                <InfoDialog
                  v-if="sub_item.description"
                  :text="sub_item.description"
                >
                  <v-icon small>mdi-information</v-icon>
                </InfoDialog>
              </span>
              <span v-html="sub_item.value"></span>
            </td>
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
  collumnsNumber: number;
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class DetailedBox extends Vue {
  @Prop() table!: ITable;
  widthCell!: string;

  created() {
    if (this.table.collumnsNumber) {
      this.widthCell = `${(1 / this.table.collumnsNumber) * 100}%`;
    } else {
      this.widthCell = "auto";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

h3 {
  font-weight: 500;
  color: $main-dark-color;
  text-align: left;
  padding: 50px 30px 10px 30px;
}
@media (max-width: 768px) {
  td,
  h3 {
    font-size: 12px !important;
  }
}
.table {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fcfcfc !important;
}
th,
td {
  padding-left: 30px !important;
}
</style>
