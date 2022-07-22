<template>
  <v-container fluid>
    <proposal-values
      :proposal_id="proposal_id"
      title="Resumo da proposta"
      page_title="Pagamento"
    >
    </proposal-values>
    <v-container>
      <payment-form v-model="paymentModel" :proposal="proposal"></payment-form>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import ProposalValues from "@/components/ProposalValues.vue";
import PaymentForm from "@/components/PaymentFom.vue";
import { Component, Vue } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { ProposalService } from "@/api/proposal";

type Proposal = {
  insurance_premium: number;
};

@Component({ components: { ProposalValues, PaymentForm } })
export default class Available extends BaseComponent {
  proposal_id = this.$route.params.proposal_id;
  paymentModel = {};
  proposal? = {} as Proposal;

  async getProposal() {
    this.proposal = await proposalService.getSimpleProposal(this.proposal_id);
  }
  async created() {
    this.changeLoading(true);
    await this.getProposal();
    this.changeLoading(false);
  }
}
</script>
