<template>
  <v-container fluid>
    <proposal-values :proposal_id="proposal_id" title="Resumo do Certificado">
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
