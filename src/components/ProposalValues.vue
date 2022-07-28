<template>
  <v-container class="container">
    <v-alert
      v-if="tableCoverage.type == 'coverages'"
      type="info"
      class="alert"
      :value="alertEnabled"
      v-text="alertMessage"
      transition="scale-transition"
    >
    </v-alert>
    <v-card class="box-content">
      <v-row class="mt-10 mr-10" align="center" justify="center">
        <v-col cols="6" sm="4" md="3" class="text-center" v-if="page_title">
          <h3 class="pa-0 text-center">{{ page_title }}</h3>
        </v-col>
        <v-col class="text-center">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="3" sm="4" class="text-center">
          <img
            class="mr-4"
            id="logo"
            :src="proposal.program.image_program"
            :alt="proposal.program.name"
          />
        </v-col>
      </v-row>
      <DetailBox :table="tableResume" :key="keyResume" class="pb-0">
        {{ title }}</DetailBox
      >
      <DetailBox :table="tableBike" class="pb-0">Bike</DetailBox>
      <h3>
        Coberturas {{ alert_coverage }}
        <InfoDialog
          text="Cobertura é a garantia de proteção contra riscos previstos nas Apólices/ Certificados/Bilhetes dos seguros."
        >
          <v-icon size="16">mdi-information</v-icon>
        </InfoDialog>
      </h3>

      <v-simple-table class="table d-none d-md-block">
        <tbody>
          <tr
            v-if="
              tableCoverage.type == 'coverages' &&
              proposal.program.flexible_deductible_enabled
            "
          >
            <td>
              <v-switch
                v-if="proposal.deductible_enabled"
                readonly
                id="switchDeductible"
                v-model="proposal.deductible_enabled"
                @change="onDeductibleEnabledChange()"
              ></v-switch>
            </td>
            <td colspan="3">
              Utilize esse botão para desabilitar ou habilitar todas as
              frânquias das coberturas
            </td>
          </tr>
          <tr v-for="(item, i) in tableCoverage.rows" :key="i">
            <td
              :style="{
                width: 25,
                padding: `${tableCoverage.padding}px 10px ${tableCoverage.padding}px 10px !important`,
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
                v-if="sub_item.value == 'switch:coverage'"
                :disabled="$store.state.proposal_coverages[i].is_fixed"
                @click="handleSwitch($event.target)"
              >
                <v-switch
                  v-if="proposal.proposal_coverages"
                  class="coverage"
                  readonly="true"
                  :disabled="$store.state.proposal_coverages[i].is_fixed"
                  :input-value="$store.state.proposal_coverages[i].enabled"
                  @click.native.capture="changeStatus($event, i)"
                  @change="
                    onSwitchChange(
                      i,
                      $store.state.proposal_coverages[i].id,
                      $event
                    )
                  "
                ></v-switch>
              </div>
              <span v-else v-html="sub_item.value"></span>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-simple-table class="table d-block d-md-none">
        <tbody>
          <tr
            v-if="
              tableCoverage.type == 'coverages' &&
              proposal.program.flexible_deductible_enabled
            "
          >
            <td>
              <v-switch
                id="switchDeductible"
                readonly="true"
                v-if="proposal.deductible_enabled"
                v-model="proposal.deductible_enabled"
                @change="onDeductibleEnabledChange()"
              ></v-switch>
            </td>
            <td colspan="3">
              Utilize esse botão para desabilitar ou habilitar todas as
              frânquias das coberturas
            </td>
          </tr>
          <template v-for="(item, i) in tableCoverage.rows">
            <tr :key="`a-${i}`">
              <td
                :style="{
                  width: 25,
                  padding: `${tableCoverage.padding}px 10px ${tableCoverage.padding}px 10px !important`,
                }"
                v-for="index in 3"
                :key="index"
              >
                <span>
                  <InfoDialog
                    class="info-dialog"
                    v-if="item.values[index - 1].description"
                    :text="item.values[index - 1].description"
                  >
                    <v-icon size="16" class="info-icon">mdi-information</v-icon>
                  </InfoDialog>
                </span>
                <div
                  v-if="item.values[index - 1].value == 'switch:coverage'"
                  :disabled="$store.state.proposal_coverages[i].is_fixed"
                  @click="handleSwitch($event.target)"
                >
                  <v-switch
                    v-if="proposal.proposal_coverages"
                    class="coverage"
                    readonly="true"
                    :disabled="$store.state.proposal_coverages[i].is_fixed"
                    :input-value="$store.state.proposal_coverages[i].enabled"
                    @click.native.capture="changeStatus($event, i)"
                    @change="
                      onSwitchChange(
                        i,
                        $store.state.proposal_coverages[i].id,
                        $event
                      )
                    "
                  ></v-switch>
                </div>
                <span v-else v-html="item.values[index - 1].value"></span>
              </td>
            </tr>
            <tr :key="`b-${i}`" class="premium-lmi">
              <td colspan="2" v-html="item.values[3].data.premium"></td>
              <td colspan="2" v-html="item.values[3].data.lmi"></td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>
      <DetailBox
        v-if="
          proposal.installment.length && proposal.installment[0].amount > 0.0
        "
        :table="tableInstallments"
        :key="keyResume"
        class="pb-0 table-installments"
      >
        Parcelas
      </DetailBox>
      <v-divider></v-divider>
      <v-row class="back-foward" justify="space-between">
        <v-btn v-if="back_link" :href="back_link" color="white" elevation="0"
          >Voltar</v-btn
        >
        <v-btn
          v-if="next_link"
          :href="next_link"
          color="white"
          elevation="0"
          class="success-santuu"
        >
          Avançar
        </v-btn>
      </v-row>
      <v-row class="prices" justify="center">
        <v-col md="6" cols="12" v-if="hasDiscount" class="d-flex d-md-none">
          <PriceBox
            :good="true"
            :bold="false"
            :price="proposal.gross_insurance_premium"
            >Prêmio bruto total
            <InfoDialog
              text="Termo utilizado para definir o preço final em dinheiro que o segurado paga ao segurador, incluídos os encargos (IOF), para que este assuma um determinado conjunto de riscos, pagando-lhe uma indenização em caso de sinistro"
            >
              <v-icon size="12">mdi-information</v-icon>
            </InfoDialog>
          </PriceBox>
        </v-col>
        <v-col md="6" cols="12" v-if="hasDiscount" class="d-flex d-md-none">
          <PriceBox
            :good="true"
            :bold="false"
            :price="-proposal.insurance_premium_discount"
            >Desconto de {{ proposal.voucher.discount_percentage }}%
            <InfoDialog text="Valor a ser descontado do prêmio bruto total">
              <v-icon size="12">mdi-information</v-icon>
            </InfoDialog>
          </PriceBox>
        </v-col>
        <v-col md="4" cols="12" class="d-flex d-md-none">
          <PriceBox :bad="true" :bold="false" :price="proposal.iof"
            >Valor do IOF
            <InfoDialog
              text="O IOF é a sigla para Imposto sobre Operações Financeiras. Esse imposto é calculado sobre o valor do prêmio líquido para se obter o valor final do seguro a ser pago (prêmio a pagar)"
            >
              <v-icon size="12">mdi-information</v-icon>
            </InfoDialog>
          </PriceBox>
        </v-col>
        <v-col md="4" cols="12" class="d-flex d-md-none">
          <PriceBox
            :bold="true"
            :good="true"
            v-if="proposal.proposal_bids"
            :numberInstallments="proposal.number_of_installments"
            :price="proposal.insurance_premium"
            >Em até<InfoDialog text="Máximo número de parcelas">
              <v-icon size="12">mdi-information</v-icon>
            </InfoDialog></PriceBox
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card>
    <v-bottom-navigation app class="d-flex d-none">
      <v-col md="2" class="ma-0 pa-0 d-none d-md-flex" v-if="hasDiscount">
        <PriceBox
          :good="true"
          :bold="false"
          :price="proposal.gross_insurance_premium"
          >Prêmio bruto total
          <InfoDialog
            text="Termo utilizado para definir o preço final em dinheiro que o segurado paga ao segurador, incluídos os encargos (IOF), para que este assuma um determinado conjunto de riscos, pagando-lhe uma indenização em caso de sinistro"
          >
            <v-icon size="12">mdi-information</v-icon>
          </InfoDialog>
        </PriceBox>
      </v-col>
      <v-col
        md="2"
        class="ma-0 pa-0 d-none d-md-flex"
        v-if="discount.discount_renew_program"
      >
        <PriceBox
          :good="true"
          :bold="false"
          :price="
            (discount.discount_renew_program * proposal.insurance_premium) / 100
          "
          >Desconto de {{ discount.discount_renew_program }}%
          <InfoDialog text="Valor a ser descontado do prêmio bruto total">
            <v-icon size="12">mdi-information</v-icon>
          </InfoDialog>
        </PriceBox>
      </v-col>
      <v-col md="2" class="ma-0 pa-0 d-none d-md-flex">
        <PriceBox :bad="true" :bold="false" :price="proposal.iof"
          >Valor do IOF
          <InfoDialog
            text="O IOF é a sigla para Imposto sobre Operações Financeiras. Esse imposto é calculado sobre o valor do prêmio líquido para se obter o valor final do seguro a ser pago (prêmio a pagar)"
          >
            <v-icon size="12">mdi-information</v-icon>
          </InfoDialog>
        </PriceBox>
      </v-col>
      <v-col md="2" class="ma-0 pa-0 d-flex">
        <PriceBox
          :bold="true"
          :good="true"
          :price="
            proposal.insurance_premium -
            (discount.discount_renew_program * proposal.insurance_premium) / 100
          "
        >
          Prêmio a pagar
          <InfoDialog text="Valor final a ser pago">
            <v-icon size="12">mdi-information</v-icon>
          </InfoDialog>
        </PriceBox>
      </v-col>
      <v-col md="2" class="ma-0 pa-0 d-none d-md-flex" cols="12">
        <PriceBox
          :bold="true"
          :good="true"
          v-if="proposal.proposal_bids"
          :numberInstallments="proposal.number_of_installments"
          :price="
            proposal.insurance_premium -
            (discount.discount_renew_program * proposal.insurance_premium) / 100
          "
          >Em até<InfoDialog text="Máximo número de parcelas">
            <v-icon size="12">mdi-information</v-icon>
          </InfoDialog></PriceBox
        >
      </v-col>
    </v-bottom-navigation>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import DetailBox, {
  IDetailedInfo,
  ITableRow,
} from "@/components/shared/DetailBox.vue"; // @ is an alias to /src
import PriceBox from "@/components/shared/PriceBox.vue";
import { IProposal } from "@/types/proposal";
import { ProposalService } from "@/api/proposal";
import { formatPrice, formatDate } from "@/utils/utils";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { MutationTypes, IDialog } from "@/store";
import { CoverageService } from "@/api/coverage";
import { toDDMMYYYY } from "@/utils/utils";
const coverageService = new CoverageService();
const proposalService = new ProposalService();

const titlesResume: IDetailedInfo[] = [
  {
    value: "Data de criação da proposta:",
    description: "",
  },
  {
    value: "Vigência:",
    description: "",
  },
  {
    value: "Valor total do prêmio:",
    description: "",
  },
  {
    value: "Em até:",
    description: "",
  },
];

var itemsResume: ITableRow[] = [
  {
    values: [],
  },
];

const tableResume = {
  titles: titlesResume,
  rows: itemsResume,
  columnsNumber: 4,
};

const titlesBike: IDetailedInfo[] = [
  {
    value: "Marca",
    description: "",
  },
  {
    value: "Categoria",
    description: "",
  },
  {
    value: "Modelo",
    description: "",
  },
  {
    value: "Valor da Bicicleta nova",
    description: "",
  },
];

var itemsBike: ITableRow[] = [
  {
    values: [],
  },
];

const tableBike = {
  titles: titlesBike,
  rows: itemsBike,
  columnsNumber: 4,
};

const titlesInstallments: IDetailedInfo[] = [
  {
    value: "Data de Pagamento",
    description: "",
  },
  {
    value: "Valor",
    description: "",
  },
];
const itemsInstallments: ITableRow[] = [
  {
    values: [],
  },
];
const tableInstallments = {
  titles: titlesInstallments,
  rows: itemsInstallments,
};

const titlesCoverage: IDetailedInfo[] = [];

var itemsCoverage: ITableRow[] = [];

const tableCoverage = {
  titles: titlesCoverage,
  rows: itemsCoverage,
  padding: 10,
  type: "coverages",
};

type Discount = {
  discount_renew_program: number;
};

type CallFunctionLoading = (loading: boolean) => void;
type CallFunctionDialog = (payload: IDialog) => void;

@Component({
  components: {
    DetailBox,
    PriceBox,
    InfoDialog,
  },
})
export default class ProposalValues extends Vue {
  tableResume = tableResume;
  tableBike = tableBike;
  tableCoverage = tableCoverage;
  tableInstallments = tableInstallments;
  proposal = {} as IProposal;
  keyResume = 0;
  discount = {} as Discount;

  alertEnabled = false;
  alertMessage = "Alerta!";

  @Prop() alert_coverage!: string;
  @Prop() title!: string;
  @Prop() proposal_id!: string;
  @Prop({ default: "" }) page_title!: string;
  @Prop() next_link!: string;
  @Prop() back_link!: string;
  @Prop() type!: string;
  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainDialog!: CallFunctionDialog;

  get hasDiscount(): boolean {
    return this.proposal.voucher != undefined;
  }

  formatPrice = formatPrice;
  formatDate = formatDate;

  next() {
    window.location.href = `/web/associate/proposal_user_warn?proposal=${this.proposal_id}`;
  }

  async getProposal(id: number) {
    this.changeLoading(true);
    const response = await proposalService.getProposal(id);
    this.proposal = response;
    this.discount = await proposalService.getDiscountProgram(this.proposal_id);
    this.setValues();
    this.$store.commit(
      MutationTypes.CHANGE_COVERAGES,
      this.proposal.proposal_coverages
    );
    this.changeLoading(false);
  }

  get insurancePremium() {
    return `R$ ${this.proposal.insurance_premium}`;
  }

  setValues() {
    // Criando tabela de resumo da proposta

    if (this.proposal.proposal_bids.length) {
      const numberInstallments =
        this.proposal.proposal_bids[0].number_of_installments;

      var installments =
        numberInstallments == null
          ? "Indefinido"
          : `${numberInstallments} x de R$ ${formatPrice(
              (this.proposal.insurance_premium -
                (this.discount.discount_renew_program *
                  this.proposal.insurance_premium) /
                  100) /
                numberInstallments
            )}`;
    } else {
      installments = "Sem parcelamentos";
    }

    const resume = [
      {
        value: this.formatDate(this.proposal.created_at),
        description: "",
      },
      {
        value: "1 ano de seguro",
        description: "",
      },
      {
        value: `R$ ${this.proposal.insurance_premium}`,
        description: "",
      },
      {
        value: installments,
        description: "",
      },
    ];

    tableResume.rows[0].values = resume;

    // Criando tabela de dados da bike
    const bike = [
      {
        value: this.proposal.associate_bikes[0].brand,
        description: "",
      },
      {
        value: this.proposal.associate_bikes[0].category,
        description: "",
      },
      {
        value: this.proposal.associate_bikes[0].model,
        description: "",
      },
      {
        value: this.proposal.associate_bikes[0].price,
        description: "",
      },
    ];

    tableBike.rows[0].values = bike;
    // Criando tabela das parcelas

    if (this.proposal.installment) {
      // this.proposal.installment.sort((a, b) => a.payment_date - b.payment_date); //Ordenando

      this.proposal.installment.forEach(function (installment) {
        const installmentObj = [
          //Fazendo umm "loop" pra adicionar o valores a variável
          {
            value: toDDMMYYYY(installment.payment_date),
            description: "",
          },
          {
            value: `R$ ${installment.amount}`,
            description: "",
          },
        ];
        //Fazendo um push na tabela
        tableInstallments.rows.push({
          values: installmentObj,
        });
      });
    }

    // Ordenar
    this.proposal.proposal_coverages.sort((a, b) => a.order - b.order);
    // Criando tabela de coberturas
    tableCoverage.rows = [];
    this.proposal.proposal_coverages.forEach(function (coverage) {
      const coverageObj = [
        {
          value: "switch:coverage",
          description: "",
          // "Desabilitar cobertura: " +
          // coverage.name.replace("( ", "(").replace(" )", ")"),
          data: coverage,
        },
        {
          value: coverage.name.replace("( ", "(").replace(" )", ")"),
          description: coverage.legal_text,
        },
        {
          value: `<b> Franquia/POS: </b> ${coverage.deductible_text}`,
          description:
            "Participação obrigatória: é a parcela dos prejuízos suportada pelo Segurado. A participação obrigatória é deduzida dos prejuízos apurados ou indenizáveis, conforme previsto em cada uma das coberturas contratadas, havendo ou não perda total.",
        },
        {
          value: `<b>Prêmio Líquido:</b> ${coverage.amount} <br/> <b>LMI:</b> ${coverage.lmi}`,
          description: "",
          data: {
            premium: `<b>Prêmio Líquido:</b> ${coverage.amount}`,
            lmi: `<b>LMI:</b> ${coverage.lmi}`,
          },
        },
      ];
      tableCoverage.rows.push({
        values: coverageObj,
      });
    });
  }
  async updateCoverage(coverage_id: number, enabled: boolean) {
    const updates = [
      {
        coverage_id: coverage_id,
        enabled: enabled,
      },
    ];
    const response = await coverageService.updateCoverage(updates);
    this.getProposal(parseInt(this.proposal_id));
  }

  async updateDeductibleEnabled(proposal_id: number, enabled: boolean) {
    const update = {
      proposal_id: proposal_id,
      enabled: enabled,
    };
    const response = await proposalService.updateDeductibleEnabled(update);
    this.getProposal(parseInt(this.proposal_id));
  }

  toAlert(message: string, time: number) {
    this.alertEnabled = true;
    this.alertMessage = message;
    setTimeout(() => {
      this.alertEnabled = false;
    }, time);
  }

  handleSwitch(target: HTMLInputElement) {
    if (target.getAttribute("disabled")) {
      this.changeMainDialog({
        active: true,
        bntClose: true,
        msg: "Esta cobertura é básica e não pode ser desativada.",
        persistent: false,
        title: "Erro",
      });
    }
  }
  onDeductibleEnabledChange() {
    this.updateDeductibleEnabled(
      this.proposal.id,
      this.proposal.deductible_enabled
    );
    this.updateValues();
  }

  changeStatus(event: Event, index: number) {
    const coverage = this.$store.state.proposal_coverages[index];
    const value = coverage.amount;
    if (
      this.proposal.insurance_premium - value <
        this.proposal.program.minimal_premium &&
      coverage.enabled &&
      this.type == "proposal_values"
    ) {
      event.stopPropagation();

      this.changeMainDialog({
        active: true,
        bntClose: true,
        msg: "Premio Bruto mínimo atingido e todas as coberturas estão habilitadas. O valor final do seguro não será alterado ao excluir coberturas. Portanto, essa função está desabilitada para o valor da bicicleta inserida.",
        persistent: false,
        title: "Erro",
      });
    }
  }

  onSwitchChange(index: number, indexDB: number, event: Event) {
    const coverage = this.$store.state.proposal_coverages[index];
    const toEnabled = !coverage.enabled;
    this.updateCoverage(indexDB, toEnabled);
    this.updateValues();
  }

  updateResume() {
    this.tableResume.rows[0].values[2] = {
      value: `R$ ${this.proposal.insurance_premium}`,
      description: "",
    };
    this.keyResume += 1;
  }

  updateValues() {
    this.updateResume();
  }

  created() {
    this.getProposal(parseInt(this.proposal_id));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.price-box {
  font-size: 14px;
  border-radius: 0px;
}
#logo {
  max-width: 70px;
}
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
.premium-lmi {
  background-color: #15ff002c;
}
.table {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fcfcfc !important;
}
th,
td {
  font-size: 12px !important;
  padding-left: 30px !important;
}
h3 {
  font-weight: 500;
  color: $main-dark-color;
  text-align: left;
  padding: 50px 30px 10px 30px;
}
.box-content {
  margin: auto;
  margin-top: 40px;
  max-width: 1080px;
  padding: 20px;
}
.success-santuu {
  color: $main-dark-color !important;
}
.prices {
  margin-top: 50px;
  margin-bottom: 20px;
}
.back-foward {
  margin-top: 40px;
  margin-bottom: 50px;
}
.back-foward button {
  font-size: 12px !important;
}
@media (min-width: 768px) {
  th,
  td {
    font-size: 14px !important;
  }
  .box-content {
    padding: 50px;
  }
  .back-foward button {
    margin-top: 80px;
    font-size: 16px !important;
  }
  .content {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  #logo {
    max-width: 100px;
  }
}
@media (min-width: 960px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
<style>
.info-button {
  min-width: 0px !important;
  width: 20px !important;
  height: 20px !important;
}
.table-installments {
  text-align: center !important;
}
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  text-align: center !important;
}
</style>
