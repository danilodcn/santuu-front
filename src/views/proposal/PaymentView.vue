<template>
  <v-container fluid>
    <proposal-values
      :proposal_id="proposal_id"
      title="Resumo da proposta"
      page_title="Pagamento"
    >
    </proposal-values>

    <v-container>
      <v-card>
        <v-card-title class="main-color">
          <span class="mt-5 mx-4"> Termos </span>
        </v-card-title>
        <v-col class="mx-4 px-4">
          <v-checkbox
            v-for="(item, i) in termsAndConditions"
            :key="`selected-${i}`"
            :label="item.message"
            :value="item.accept"
            v-model="item.accept"
          />
        </v-col>
      </v-card>
    </v-container>

    <v-container>
      <payment-form
        v-model="paymentModel"
        :proposal="proposal"
        :terms="termsAndConditions"
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

type Terms = {
  message: string;
  accept?: boolean;
};

const proposalService = new ProposalService();

@Component({ components: { ProposalValues, PaymentForm } })
export default class Available extends BaseComponent {
  proposal_id = this.$route.params.proposal_id;
  paymentModel = {};
  proposal? = {} as Proposal;

  termsAndConditions: Terms[] = [
    {
      message:
        "Ao marcar este campo, concordo com os dados e valores acima para efetuar o pagamento da proposta.",
    },
    {
      message:
        "Aceito receber comunicação via e-mail com ofertas e benefícios do Clube Santuu e Clube Decatlhon.",
    },
    {
      message: "Aceito receber comunicação via celular.",
    },
  ];

  acceptTerms: boolean[] = [];

  async getProposal() {
    this.proposal = await proposalService.getSimpleProposal(this.proposal_id);
  }
  async created() {
    this.changeLoading(true);
    await this.getProposal();
    this.changeLoading(false);
  }

  mounted() {
    console.log(this.termsAndConditions);
    this.acceptTerms = this.termsAndConditions.map((item) => !!item.accept);
  }
}
</script>
