<template>
  <v-main>
    <h3><slot></slot></h3>
    <v-simple-table class="table d-none d-md-block">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in table.titles" :key="item.value">
              {{ item.value }}
              <InfoDialog v-if="item.description" :text="item.description">
                <v-icon size="16">mdi-information</v-icon>
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
              v-for="(sub_item, index) in item.values"
              :key="index"
            >
              <span>
                <InfoDialog
                  class="info-dialog"
                  v-if="sub_item.description"
                  :text="sub_item.description"
                >
                  <v-icon size="16" class="info-icon">mdi-information</v-icon>
                </InfoDialog>
              </span>
              <span v-html="sub_item.value"></span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table class="table d-block d-md-none">
      <template v-slot:default>
        <tbody v-for="(item, i) in table.rows" :key="i">
          <tr v-for="(sub_item, index) in item.values" :key="index">
            <td>
              <b>
                {{ table.titles[index].value }}
              </b>
              &nbsp;
              <InfoDialog
                v-if="table.titles[index].description"
                :text="table.titles[index].description"
              >
                <v-icon size="16">mdi-information</v-icon>
              </InfoDialog>
              <span>
                <InfoDialog
                  class="info-dialog"
                  v-if="sub_item.description"
                  :text="sub_item.description"
                >
                  <v-icon size="16" class="info-icon">mdi-information</v-icon>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { RootState, MutationTypes } from "@/store";
import { CoverageService } from "@/api/coverage";
import { ProposalService } from "@/api/proposal";
import { IProposal } from "@/types/proposal";

const coverageService = new CoverageService();
const proposalService = new ProposalService();

export interface IDetailedInfo {
  value: string | number;
  description: string;
  data?: any;
}

export interface ITableRow {
  values: IDetailedInfo[];
}

interface ITable {
  titles: ITableRow;
  rows: ITableRow[];
  padding: number;
  columnsNumber: number;
  type: string;
}

interface ISwitch {
  enabled: boolean;
  isFixed: boolean;
}

class UpdateSwitch {
  _value = false;

  constructor(initialValue: boolean) {
    this._value = initialValue;
  }

  get value() {
    return this._value;
  }
  set value(newValue: boolean) {
    this._value = newValue;
  }
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class DetailedBox extends Vue {
  @Prop() table!: ITable;
  @Prop() sumCoverages!: () => number;
  @Prop() proposal!: IProposal;
  widthCell!: string;
  messageAlert!: string;

  switches!: UpdateSwitch[];
  switchCoverages(coverages: ISwitch[]): UpdateSwitch[] {
    const switches: UpdateSwitch[] = [];
    coverages.forEach((item) => {
      switches.push(new UpdateSwitch(item.enabled));
    });
    this.switches = switches;
    return switches;
  }

  proposal_coverages = this.$store.state.proposal_coverages;

  get nome() {
    return true;
  }

  created() {
    if (this.table.columnsNumber) {
      this.widthCell = `${(1 / this.table.columnsNumber) * 100}%`;
    } else {
      this.widthCell = "auto";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.alert {
  z-index: 999;
  text-align: center;
  border-radius: 0px !important;
  top: 0px;
  left: 0px;
  width: 100%;
  position: fixed;
  padding: 20px 30px !important;
}
h3 {
  font-weight: 500;
  color: $main-dark-color;
  text-align: left;
  padding: 50px 30px 10px 30px;
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
@media (min-width: 768px) {
  .alert {
    padding: 20px 130px !important;
  }
  .row-price {
    font-size: 0.875rem !important;
  }
}
</style>
