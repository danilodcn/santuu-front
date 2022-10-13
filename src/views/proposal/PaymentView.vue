<template>
  <v-container class="container">
    <v-card class="box-content">
      <DetailBox
        :paymentChoice="paymentChoice"
        :table="tableDescription"
        :key="keyResume"
        class="pb-0 table-Description"
      >
        Finalizar Renovação <br />
        <br />
        <h6>Segue um resumo da sua renovação:</h6>
      </DetailBox>
      <v-card-title class="main-color">
        <span class="mt-5 mx-4 pb-0"> Termos </span>
      </v-card-title>
      <v-col class="mx-4 px-4 pb-0">
        <v-checkbox
          v-for="(item, i) in termsAndConditions"
          :key="`selected-${i}`"
          :label="item.message"
          :value="item.accept"
          v-model="item.accept"
        />
      </v-col>
      <payment-form
        v-model="paymentModel"
        :proposal="proposal"
        :terms="termsAndConditions"
        :linkNext="`/web/associate/proposal/payment/sucess?proposal=${proposal_id}&email_check=true&cell_check=true`"
      ></payment-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import ProposalValues from "@/components/ProposalValues.vue";
import PaymentForm from "@/components/PaymentFom.vue";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { ProposalService } from "@/api/proposal";
import DetailBox, {
  IDetailedInfo,
  ITableRow,
} from "@/components/shared/DetailBox.vue";
import { formatDateDetail, formatPrice } from "@/utils/utils";

type Proposal = {
  iof: number;
  gross_insurance_premium: number;
  insurance_premium_discount: number;
  insurance_premium: number;
  proposal_duration: string;
  renewed_by_admin: boolean;
};

type Discount = {
  discount_percent_renew: string;
  calculated_insurance_premium: number;
  discount: number;
  new_iof: number;
};

type Terms = {
  message: string;
  accept?: boolean;
};

const titlesDescription: IDetailedInfo[] = [
  {
    value: "Data e hora do Início:",
    description: "",
  },
  {
    value: "IOF:",
    description: "",
  },
  {
    value: "Valor:",
    description: "",
  },
  {
    value: "Desconto de Renovação:",
    description: "",
  },
  {
    value: "Valor Total:",
    description: "",
  },
];
var itemsDescription: ITableRow[] = [
  {
    values: [],
  },
];

const tableDescription = {
  titles: titlesDescription,
  rows: itemsDescription,
};
const proposalService = new ProposalService();

@Component({ components: { ProposalValues, PaymentForm, DetailBox } })
export default class Available extends BaseComponent {
  proposal_id = this.$route.params.proposal_id;
  paymentModel = {};
  proposal = {} as Proposal;
  keyResume = 0;
  tableDescription = tableDescription;
  discount = {} as Discount;

  termsAndConditions: Terms[] = [
    {
      message:
        "Ao marcar este campo, concordo com os dados e valores acima para efetuar o pagamento da proposta.",
    },
  ];

  acceptTerms: boolean[] = [];

  get paymentChoice() {
    this.setValues();
    return this.$store.state.payment_choice;
  }

  async getProposal() {
    this.proposal = await proposalService.getSimpleProposal(this.proposal_id);
    this.discount = await proposalService.getDiscountRenew(this.proposal_id);
    this.setValues();
  }
  async created() {
    this.changeLoading(true);
    await this.getProposal();
    this.changeLoading(false);
  }
  setValues() {
    const description = [
      {
        value: formatDateDetail(this.proposal.proposal_duration),
        description:
          "A renovação terá vigência a partir do termino da cobertura atual e não a data de pagamento.",
      },
      {
        value: formatPrice(this.discount.new_iof),
        description: "",
      },
      {
        value: this.proposal.insurance_premium,
        description: "",
      },
      {
        value:
          this.paymentChoice == "Crédito 1x"
            ? `${formatPrice(this.discount.discount)}(${
                this.discount.discount_percent_renew
              }%)`
            : formatPrice(0),
        description: this.proposal.renewed_by_admin
          ? "O desconto só é aplicado se o pagamento for à vista"
          : "",
      },
      {
        value: formatPrice(this.discount.calculated_insurance_premium),
        description: "",
      },
    ];
    this.tableDescription.rows[0].values = description;
  }
  mounted() {
    console.log(this.termsAndConditions);
    this.acceptTerms = this.termsAndConditions.map((item) => !!item.accept);
  }
}
</script>
<style lang="scss" scoped>
h6 {
  font-weight: 100;
}
.box-content {
  margin: auto;
  margin-top: 40px;
  max-width: 1080px;
  padding: 20px;
}
.table-Description {
  text-align: center !important;
  max-width: 1000px;
}

.main-color {
  color: #c1c523;
}
@media (min-width: 768px) {
  .box-content {
    padding: 50px;
  }
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
<style lang="css">
.table {
  margin-left: 30px !important;
  margin-right: 30px !important;
}
.table-Description:last-child {
  background-color: #c1c523 !important;
}
</style>
