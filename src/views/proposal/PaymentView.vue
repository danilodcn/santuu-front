<template>
  <v-container fluid>
    <proposal-values
      :proposal_id="proposal_id"
      title="Resumo da proposta"
      page_title="Pagamento"
    >
    </proposal-values>
    <v-container>
      <payment-form
        v-model="paymentModel"
        :proposal="proposal"
        :linkNext="`/web/associate/proposal/payment/sucess?proposal=${proposal_id}&email_check=true&cell_check=true`"
      ></payment-form>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import ProposalValues from "@/components/ProposalValues.vue";
import PaymentForm from "@/components/PaymentFom.vue";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { ProposalService } from "@/api/proposal";

type Proposal = {
  insurance_premium: number;
};

const proposalService = new ProposalService();

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
