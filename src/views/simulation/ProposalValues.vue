<template>
  <v-container class="container">
    <v-card class="box-content">
      <DetailBox :table="tableResume">Resumo da proposta</DetailBox>
      <DetailBox :table="tableBike">Bike</DetailBox>
      <DetailBox :table="tableCoverage" :sumCoverages="sumCoverages">
        Coberturas
        <InfoDialog
          text="Cobertura é a garantia de proteção contra riscos previstos nas Apólices/ Certificados/Bilhetes dos seguros."
        >
          <v-icon size="16">mdi-information</v-icon>
        </InfoDialog>
      </DetailBox>
      <v-row class="prices" justify="space-between">
        <v-col class="col-4 pa-1">
          <PriceBox :bad="true" :bold="false" :price="proposal.iof"
            >Valor do IOF
            <InfoDialog
              text="O IOF é a sigla para Imposto sobre Operações Financeiras. Esse imposto é calculado sobre o valor do prêmio líquido para se obter o valor final do seguro a ser pago (prêmio a pagar)"
            >
              <v-icon size="16">mdi-information</v-icon>
            </InfoDialog>
          </PriceBox>
        </v-col>
        <v-col class="col-4 pa-1">
          <PriceBox :bold="true" :good="true" :price="price">
            Prêmio a pagar
            <InfoDialog text="Valor final a ser pago">
              <v-icon size="16">mdi-information</v-icon>
            </InfoDialog>
          </PriceBox>
        </v-col>
        <v-col class="col-4 pa-1">
          <PriceBox
            :bold="true"
            :good="true"
            :numberInstallments="
              proposal.proposal_bids[0].number_of_installments
            "
            :price="price"
            >Em até<InfoDialog text="Máximo número de parcelas">
              <v-icon size="16">mdi-information</v-icon>
            </InfoDialog></PriceBox
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="back-foward" justify="space-between">
        <v-btn color="white" disabled elevation="0">Voltar</v-btn>
        <v-btn
          color="white"
          elevation="0"
          class="success-santuu"
          @click="next()"
        >
          Avançar
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailBox, {
  IDetailedInfo,
  ITableRow,
} from "@/components/shared/DetailBox.vue"; // @ is an alias to /src
import PriceBox from "@/components/shared/PriceBox.vue";
import { IProposal, ICoverage } from "@/types/proposal";
import { ProposalService } from "@/api/proposal";
import { formatPrice, formatDate } from "@/utils/utils";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { RootState, MutationTypes } from "@/store";

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

const titlesCoverage: IDetailedInfo[] = [];

var itemsCoverage: ITableRow[] = [];

const tableCoverage = {
  titles: titlesCoverage,
  rows: itemsCoverage,
  padding: 10,
  type: "coverages",
};

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
  proposal = {} as IProposal;
  proposal_id = this.$route.params.proposal_id;
  origin = this.$route.query.origin;

  sumCoverages() {
    let value = 0;
    this.$store.state.proposal_coverages.forEach((element: ICoverage) => {
      if (element.enabled) {
        value += Number(element.amount) * 1.0738;
      }
    });
    return value;
  }

  get price() {
    return this.sumCoverages();
  }

  formatPrice = formatPrice;
  formatDate = formatDate;

  next() {
    window.location.href = `/web/associate/proposal_user_warn?proposal=${this.proposal_id}`;
  }

  async getProposal(id: number) {
    const response = await proposalService.getProposal(id);
    this.proposal = response;
    this.setValues();
    this.$store.commit(
      MutationTypes.CHANGE_COVERAGES,
      this.proposal.proposal_coverages
    );
    console.log(this.proposal);
  }

  setValues() {
    // Criando tabela de resumo da proposta
    const numberInstallments =
      this.proposal.proposal_bids[0].number_of_installments;

    const installments =
      numberInstallments == null
        ? "Indefinido"
        : `${numberInstallments} x de R$ ${formatPrice(
            this.proposal.gross_insurance_premium / numberInstallments
          )}`;

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
        value: `R$ ${this.proposal.gross_insurance_premium}`,
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

    // Ordenar
    tableCoverage.rows.sort((a: ITableRow, b: ITableRow) => {
      return a.values[0].data.order - b.values[0].data.order;
    });
    // Criando tabela de coberturas
    this.proposal.proposal_coverages.forEach(function (coverage) {
      const bike = [
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
        },
      ];
      tableCoverage.rows.push({
        values: bike,
      });
    });
  }

  created() {
    this.getProposal(parseInt(this.proposal_id));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.box-content {
  margin: 30px;
  padding: 20px;
}
.success-santuu {
  color: $main-dark-color;
}
.prices {
  font-size: 8px !important;
  margin-top: 70px;
  margin-bottom: 20px;
}
.back-foward {
  margin-top: 80px;
}
.back-foward button {
  font-size: 12px !important;
}
@media (min-width: 768px) {
  .box-content {
    margin: 30px;
    padding: 50px;
  }
  .back-foward button {
    font-size: 16px !important;
  }
  .prices {
    font-size: 14px !important;
  }
  .content {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .prices {
    font-size: 16px;
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
  width: 20px !important;
  height: 20px !important;
}
</style>
