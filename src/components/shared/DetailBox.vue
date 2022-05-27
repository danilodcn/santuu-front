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
                <v-icon size="10">mdi-information</v-icon>
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
                  <v-icon size="10" class="info-icon">mdi-information</v-icon>
                </InfoDialog>
              </span>
              <div
                :disabled="$store.state.proposal_coverages[i].is_fixed"
                v-if="sub_item.value == 'switch:coverage'"
                @click="handleSwitch($event.target)"
              >
                <v-switch
                  class="coverage"
                  :disabled="$store.state.proposal_coverages[i].is_fixed"
                  :input-value="$store.state.proposal_coverages[i].enabled"
                  @change="onSwitchChange(i)"
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

  onSwitchChange(index: number) {
    const enabled = !this.$store.state.proposal_coverages[index].enabled;
    this.$store.commit(MutationTypes.CHANGE_ENABLED, { index, enabled });
  }

  created() {
    if (this.table.columnsNumber) {
      this.widthCell = `${(1 / this.table.columnsNumber) * 100}%`;
    } else {
      this.widthCell = "auto";
    }

    console.log(this.table.type);
  }

  handleSwitch(target: HTMLInputElement) {
    if (target.getAttribute("disabled")) {
      this.alertEnabled = true;
      this.alertMessage = "Esta cobertura é básica e não pode ser desativada.";
      setTimeout(() => {
        this.alertEnabled = false;
      }, 2000);
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
