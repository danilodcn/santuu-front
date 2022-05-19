<template>
  <v-container class="container">
    <v-card class="box-content">
      <DetailBox :table="tableResume">Resumo da proposta</DetailBox>
      <DetailBox :table="tableBike">Bike</DetailBox>
      <DetailBox :table="tableCoverage">Coberturas</DetailBox>
      <v-row class="prices" justify="center">
        <v-col class="col-3">
          <PriceBox :bad="true" :bold="false" :price="proposal.iof"
            >Valor do IOF</PriceBox
          >
        </v-col>
        <v-col class="col-3">
          <PriceBox
            :bold="true"
            :good="true"
            :price="proposal.gross_insurance_premium"
            >Prêmio a pagar</PriceBox
          >
        </v-col>
        <v-col class="col-3">
          <PriceBox
            :bold="true"
            :good="true"
            numberInstallments="12"
            :price="proposal.gross_insurance_premium"
            >Em até</PriceBox
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
import { IProposal } from "@/types/proposal";
import { ProposalService } from "@/api/proposal";
import { formatPrice, formatDate } from "@/utils/utils";

const proposalService = new ProposalService();

const titlesResume: IDetailedInfo[] = [
  {
    value: "Data de criação da proposta:",
    description: "",
  },
  {
    value: "Vigência:",
    description: "Prazo de vigência do seguro",
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
  collumnsNumber: 4,
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
  collumnsNumber: 5,
};

const titlesCoverage: IDetailedInfo[] = [];

var itemsCoverage: ITableRow[] = [
  {
    values: [],
  },
];

const tableCoverage = {
  titles: titlesCoverage,
  rows: itemsCoverage,
  padding: 30,
  collumnsNumber: 3,
};

@Component({
  components: {
    DetailBox,
    PriceBox,
  },
})
export default class ProposalValues extends Vue {
  tableResume = tableResume;
  tableBike = tableBike;
  tableCoverage = tableCoverage;
  proposal = {} as IProposal;
  proposal_id = this.$route.params.proposal_id;

  formatPrice = formatPrice;
  formatDate = formatDate;

  next() {
    window.parent.location.href = `${window.parent.location.origin}/dashboard/?next=/web/associate/proposal_user_warn%3Fproposal%3D${this.proposal_id}`;
  }

  async getProposal(id: number) {
    const response = await proposalService.getProposal(id);
    this.proposal = response;
    this.setValues();
  }

  setValues() {
    // Criando tabela de resumo da proposta
    const numberInstallments =
      this.proposal.proposal_bids[0].number_of_installments;

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
        value: `${numberInstallments} x de R$ ${formatPrice(
          this.proposal.gross_insurance_premium / numberInstallments
        )}`,
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

    // Criando tabela de coberturas
    this.proposal.proposal_coverages.forEach(function (coverage) {
      const bike = [
        {
          value: coverage.name,
          description: "",
        },
        {
          value: `<b> Franquia/POS: </b> ${coverage.deductible_text}`,
          description: "",
        },
        {
          value: `<b>Prêmio Líquido:</b> ${coverage.amount} </br> LMI: ${coverage.lmi}`,
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
  padding: 50px;
}
.success-santuu {
  color: $main-dark-color;
}
.prices {
  margin-top: 40px;
  margin-bottom: 20px;
}
.back-foward {
  margin-top: 80px;
}
@media (max-width: 768px) {
  .prices {
    font-size: 14px;
  }
}
@media (min-width: 768px) {
  .content {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
@media (min-width: 960px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
