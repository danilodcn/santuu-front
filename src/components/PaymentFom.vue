<template>
  <v-card>
    <v-card-title class="main-color">
      <span class="mt-5 mx-4"> Efetuar pagamento </span>
    </v-card-title>
    <v-form ref="form">
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
              :min="date.min"
              :max="date.max"
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
          <v-btn color="primary" @click="paymentSubmit()"
            >Confirmar pagamento</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { getCardType, getNumberOfDigitsInSecurityCode } from "@/utils/payment";
import { required } from "@/utils/rules";
import { paymentService } from "@/api/payment";
import { formatDateDetail } from "@/utils/utils";

interface IInstallment {
  text: string;
  value: number;
}

interface IFormDate {
  min?: string;
  max?: string;
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
  proposal_duration: string;
};

type Terms = {
  message: string;
  accept?: boolean;
};

@Component
export default class EventCard extends BaseComponent {
  @Prop() proposal!: Proposal;
  @Prop() linkNext!: string;
  @Prop({ default: () => [] }) terms!: Terms[];

  menu = false;
  rules = { required };
  model = {} as IFormModel;
  installments: IInstallment[] = [];
  securityCodeMask = "###";
  date: IFormDate = {};

  get dateFormatted() {
    return formatDateDetail(this.proposal.proposal_duration);
  }

  formIsValid() {
    return (this.$refs.form as Vue & { validate: () => any })?.validate();
  }

  allowedMonths(val: any) {
    return true;
  }

  beforeMount() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.date.min = `${year}-${month}`;
    this.date.max = `${year + 10}-${month}`;

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
  }

  async paymentSubmit() {
    const initialValue = true;
    const acceptTerms = this.terms.map((item) => !!item.accept);
    const acceptAll = acceptTerms.reduce((a: boolean, b: boolean) => {
      return a && b;
    }, initialValue);
    console.log(acceptAll);
    if (!acceptAll) {
      this.changeMainDialog({
        active: true,
        bntClose: true,
        msg: "É necessário aceitar os termos antes de efetuar o pagamento.",
        persistent: false,
        title: "Erro!",
        ident: false,
      });
      console.log(this.terms);
      return;
    }
    const isValid = this.formIsValid();
    if (isValid) {
      const cardNumber = this.model.cardNumber.replaceAll(".", "");
      let scheme = getCardType(cardNumber);
      if (scheme == "") {
        this.changeMainDialog({
          active: true,
          bntClose: true,
          msg: "Bandeira do cartão não reconhecida",
          persistent: false,
          title: "Erro!",
          ident: false,
        });
        return;
      }
      const installment = this.installments?.find(
        (item) => item.text == this.model.installments
      );
      const numberOfInstallments = Number(installment?.value);
      const typeInstallment = installment?.text || "";

      if (typeInstallment.trim() == "Débito  1x".trim()) {
        if (scheme.trim() == "VISA".trim()) {
          scheme = "VISA_ELECTRON";
        }
        if (scheme.trim() == "MASTERCARD".trim()) {
          scheme = "MAESTRO";
        }
      }
      this.changeMainDialog({
      active: true,
      bntClose: true,
      msg:
        "A renovação terá vigência a partir do vencimento da antiga proposta: " +
      this.dateFormatted +
        " e não da data de pagamento.",
      persistent: false,
      title: "Aviso!",
      ident: false,
      });
      this.changeLoading(true);
      const response = await paymentService.handlePayment({
        ...this.model,
        cardNumber,
        scheme,
        amount: this.proposal.insurance_premium,
        proposalID: this.proposal.id,
        numberOfInstallments,
        typeInstallment,
      });
      this.changeLoading(false);
      if (response.error) {
        const message = response?.axiosError?.response?.data?.message;
        this.changeMainDialog({
          active: true,
          bntClose: true,
          msg: message || "Houve um erro interno. Tente novamente mais tarde.",
          persistent: false,
          title: "Erro!",
          ident: false,
        });
      } else {
        document.location.href = this.linkNext;
      }
    }
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
