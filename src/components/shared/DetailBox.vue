<template>
  <v-main>
    <v-alert
      v-if="table.type == 'coverages'"
      type="info"
      class="alert"
      :value="alertEnabled"
      v-text="alertMessage"
      transition="scale-transition"
    >
    </v-alert>
    <h3><slot></slot></h3>
    <v-simple-table class="table">
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
              <div
                :disabled="$store.state.proposal_coverages[i].is_fixed"
                v-if="sub_item.value == 'switch:coverage'"
                @click="handleSwitch($event.target, i)"
              >
                <v-switch
                  class="coverage"
                  :disabled="$store.state.proposal_coverages[i].is_fixed"
                  :input-value="$store.state.proposal_coverages[i].enabled"
                  @change="
                    onSwitchChange(i, $store.state.proposal_coverages[i].id)
                  "
                ></v-switch>
              </div>
              <span v-else v-html="sub_item.value"></span>
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

const coverageService = new CoverageService();

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

  alertEnabled = false;
  alertMessage = "Msg!";

  proposal_coverages = this.$store.state.proposal_coverages;

  get nome() {
    return true;
  }

  async updateCoverage(coverage_id: number, enabled: boolean) {
    const updates = [
      {
        coverage_id: coverage_id,
        enabled: enabled,
      },
    ];
    const response = await coverageService.updateCoverage(updates);
  }

  onSwitchChange(index: number, indexDB: number) {
    const enabled = !this.$store.state.proposal_coverages[index].enabled;
    this.$store.commit(MutationTypes.CHANGE_ENABLED, { index, enabled });
    this.updateCoverage(Number(indexDB), enabled);
  }

  created() {
    if (this.table.columnsNumber) {
      this.widthCell = `${(1 / this.table.columnsNumber) * 100}%`;
    } else {
      this.widthCell = "auto";
    }

    console.log(this.table.type);
  }

  toAlert(message: string, time: number) {
    this.alertEnabled = true;
    this.alertMessage = message;
    setTimeout(() => {
      this.alertEnabled = false;
    }, time);
  }

  handleSwitch(target: HTMLInputElement, index: number) {
    if (target.getAttribute("disabled")) {
      this.toAlert("Esta cobertura é básica e não pode ser desativada.", 2000);
    } else if (
      this.sumCoverages() - this.$store.state.proposal_coverages[index].amount <
      2000
    ) {
      this.$store.commit(MutationTypes.CHANGE_ENABLED, {
        index,
        enabled: true,
      });
      this.toAlert(
        "Premio Bruto mínimo atingido e todas as coberturas estão habilitadas. O valor final do seguro não será alterado ao excluir coberturas. Portanto, essa função está desabilitada para o valor da bicicleta inserida.",
        8000
      );
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
  padding: 20px 130px !important;
}
h3 {
  font-weight: 500;
  color: $main-dark-color;
  text-align: left;
  padding: 50px 30px 10px 30px;
}
@media (max-width: 768px) {
  td,
  h3 {
    font-size: 12px;
  }
  th,
  td {
    font-size: 0.475rem !important;
  }
}
.table {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fcfcfc !important;
}
@media (min-width: 768px) {
  th,
  td {
    font-size: 0.875rem !important;
  }
  .row-price {
    font-size: 0.875rem !important;
  }
}
th,
td {
  padding-left: 30px !important;
}
</style>
