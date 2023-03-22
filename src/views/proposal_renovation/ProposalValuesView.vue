<template>
  <v-container fluid>
    <proposal-values
      :proposal_id="$route.params.proposal_id"
      title="Valores da Renovação"
      back_link="/renovation/certificates"
      :next_link="`/renovation/update-proposal/${$route.params.proposal_id}`"
      alert_coverage="(Por padrão é utilizada as coberturas do antigo seguro)"
      type="proposal_values"
    >
    </proposal-values>
  </v-container>
</template>

<script lang="ts">
import ProposalValues from "@/components/ProposalValues.vue";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";

@Component({ components: { ProposalValues } })
export default class Available extends BaseComponent {
  proposal_id = this.$route.params.proposal_id;
}
</script>
