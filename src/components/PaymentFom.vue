<template>
  <v-card>
    <v-card-title class="main-color">Efetuar pagamento</v-card-title>
    <v-form>
      <v-row align="center" class="ma-4">
        <v-col cols="4">
          <v-text-field
            color="primary"
            :rules="[rules.required]"
            filled
            v-model="model.name"
            label="Nome"
            clearable
            hide-spin-buttons
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            color="primary"
            :rules="[rules.required]"
            filled
            v-model="model.cardNumber"
            label="Número do cartão"
            clearable
            hide-spin-buttons
            v-mask="'####.####.####.####'"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            class="pa-0 ma-0"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="[rules.required]"
                v-model="model.date"
                label="Data de vencimento:"
                prepend-inner-icon="mdi-calendar"
                readonly
                color="grey"
                filled
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="model.date"
              color="primary"
              type="month"
              locale="pt-br"
              @input="menu = false"
              :min="form.date.min"
              :max="form.date.max"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-text-field
            color="primary"
            :rules="[rules.required]"
            filled
            v-model="model.securityCode"
            label="CCV"
            clearable
            hide-spin-buttons
            v-mask="securityCodeMask"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            color="primary"
            :rules="[rules.required]"
            filled
            v-model="model.installments"
            label="Número de parcelas"
            :items="installments"
            item-value="text"
            clearable
            hide-spin-buttons
          ></v-select>
        </v-col>
        <v-col class="mb-4" align="center">
          <v-btn color="primary">Confirmar pagamento</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <pre>
      {{ form }}
      </pre
    >
    <pre>
      {{ model }}
      </pre
    >
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { getCardType, getNumberOfDigitsInSecurityCode } from "@/utils/payment";
import { required } from "@/utils/rules";
import { paymentService } from "@/api/payment";

interface IInstallments {
  name: string;
  number: string | number;
}

interface IFormData {
  date: { min?: string; max?: string };
  installments: { items?: IInstallments[] };
}

interface IFormModel {
  name: string;
  cardNumber: string;
  date: string;
  securityCode: string;
  installments: any;
}

type Proposal = {
  id: number;
  insurance_premium: number;
};

@Component
export default class EventCard extends BaseComponent {
  @Prop() proposal!: Proposal;
  menu = false;
  rules = { required };
  model = {} as IFormModel;
  installments = [] as any[];
  securityCodeMask = "###";
  form: IFormData = {
    installments: {},
    date: {},
  };

  allowedMonths(val: any) {
    return true;
  }

  beforeMount() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.form.date.min = `${year}-${month}`;
    this.form.date.max = `${year + 10}-${month}`;

    this.$watch(() => this.model, this.onModelChange);
    console.log(this.proposal, "Aqui");
    this.getPaymentOptions();
  }

  onModelChange(val: any) {
    console.log(val);
    this.$emit("input", val);
  }

  async getPaymentOptions() {
    console.log("dentro", new Date(), this.proposal?.id);
    if (!this.proposal?.id) {
      console.log("dentro do log");

      setTimeout(this.getPaymentOptions, 200);
      return;
    }

    this.installments = await paymentService.getPaymentOptions(
      this.proposal.id
    );
    console.log(this.installments, "Aqui");
  }

  @Watch("model.securityCode")
  onSecurityCodeChange(val: any) {
    const numberOfDigits = getNumberOfDigitsInSecurityCode(
      this.model.cardNumber || ""
    );
    this.securityCodeMask = "#".repeat(numberOfDigits);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.main-color {
  color: $main-dark-color;
}
</style>
