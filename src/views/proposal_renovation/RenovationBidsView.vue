<template>
  <v-card class="px-0 px-md-5 py-10 mt-5">
    <div v-if="proposal.program.type == 1" class="justify-md-center">
      <v-row class="justify-start justify-md-center event-content">
        <h3 class="title-content">Bike</h3>
        <table id="customers">
          <tr>
            <th>
              {{ associate_data.brand }}
              <div id="modal-serial-number" class="modal"></div>
            </th>
            <th>
              {{ associate_data.category }}
              <div id="modal-category" class="modal"></div>
            </th>
            <th>
              {{ associate_data.model }}
              <div id="modal-model" class="modal"></div>
            </th>
            <th>
              R$ {{ associate_data.price }}
              <div id="modal-bike-value" class="modal"></div>
            </th>
          </tr>
        </table>
        <br />
      </v-row>
    </div>
    <div v-else class="justify-md-center">
      <table id="customers">
        <tr>
          <th>{{ associate_data.plan.name }}</th>
          <th>R$ {{ associate_data.plan.amount }}</th>
        </tr>
      </table>
    </div>
    <h3
      v-if="proposal.program.flexible_deductible_enabled"
      class="title-content"
    >
      Habilitar Franquias / P.O.S.
    </h3>
    <div
      v-if="proposal.program.flexible_deductible_enabled"
      class="justify-md-center"
    ></div>
    <br />
    <h3 class="title-content">Coberturas</h3>
    <div class="justify-md-center">
      <div v-for="coverage in proposal_coverages" :key="coverage">
        <div class="justify-md-center">
          <div
            v-if="proposal.program.flexible_coverage_enabled"
            class="justify-md-center"
          >
            <span v-if="coverage.is_fixed" class="info-on-off"
              >Cobertura Básica</span
            >
            <v-checkbox
              class="switch"
              type="checkbox"
              change
              :id="coverage.id"
              name="coverage"
              readonly="true"
            ></v-checkbox>
            <span class="info-on-off">Desativar/Ativar</span>
            <v-checkbox
              class="switch"
              type="checkbox"
              change
              :id="coverage.id"
              name="coverage"
              readonly="true"
            ></v-checkbox>
          </div>
          <div class="row-coverage-name">
            <p>
              {{ coverage.name }}
              {{ coverage.id }}
            </p>
          </div>
          <div class="row row-franchise">
            <p>
              <strong>Franquia / POS:</strong>
              {{ coverage.deductible_text }}
              {{ coverage.id }}
            </p>
          </div>
          <div class="container container-values">
            <div>
              <p>
                <strong>Prêmio Liquido:</strong>
                R$
                <span class="amount">
                  {{ coverage.id }} >
                  {{ coverage.amount }}
                </span>
              </p>
              <p>
                <strong>LMI:</strong>
                R$
                <span class="lmi"> {{ coverage.id }}> {{ coverage.lmi }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="values-mobile-coverages row">
          <div>
            <p>
              <strong>Prêmio Liquido:</strong> R$
              <span class="amount">
                {{ coverage.id }}>
                {{ coverage.amount }}
              </span>
            </p>
          </div>
          <div>
            <p>
              <strong>LMI:</strong> R$
              <span> {{ coverage.id }} > {{ coverage.lmi }}</span>
            </p>
          </div>
        </div>
      </div>
      <br />
      <v-row class="values">
        <div v-if="proposal.voucher" class="first-div-values">
          <h3 class="title-content">Prêmio bruto total</h3>
          <div>
            <p>R${{ proposal.gross_insurance_premium }}</p>
          </div>
        </div>
        <div class="first-div-values">
          <h3 class="title-content">Desc. de {{ proposal.voucher }}&#37;:</h3>
          <div>
            <p>R$ -{{ proposal.insurance_premium_discount }}</p>
          </div>
        </div>
        <div v-if="proposal.minimal_premium_reached" class="first-div-values">
          <h3 class="title-content">AVISO:</h3>
          <div>
            <p>
              Desconto total não aplicado, <br />
              o prêmio mínimo é R$ 409,99
            </p>
          </div>
        </div>
        <div>
          <h3 class="title-content">Valor do Iof</h3>
          <div>
            <p>R$ {{ proposal.iof }}</p>
          </div>
        </div>
        <div>
          <h3 class="title-content">Prêmio a pagar</h3>
          <p>R$ {{ proposal.insurance_premium }}</p>
        </div>
        <div>
          <h3 class="title-content">Em até:</h3>
          <p>
            {{ proposal.number_of_installments }} x R$
            {{ proposal.insurance_premium }} /
            {{ proposal.number_of_installments }}
          </p>
        </div>
      </v-row>
      <br />
      <div class="sinister-buttons mobile-display">
        <v-btn class="button-primary" />
        Enviar por email
      </div>
      <div>
        <v-btn class="btn" />Voltar
        <v-btn
          :href="'/web/associate/proposal_user_warn?proposal={{proposal.id}}'"
          class="btn"
        />Avançar
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import {
  IProposalRenovation,
  ICoverage,
  IAssociateData,
} from "@/types/renovation";
import { Vue } from "vue-property-decorator";

export default class Available extends Vue {
  proposal: IProposalRenovation = {
    id: 0,
    created_at: "28/11/1998",
    proposal_coverages: [],
    associate_data: [],
    iof: 0,
    gross_insurance_premium: 0,
    program: {
      id: 0,
      name: "Caloi",
      flexible_coverage_enabled: true,
      flexible_deductible_enabled: true,
      image_program: "string",
      minimal_premium: 500,
      iof_tax_rate: 27,
      type: 1,
    },
    proposal_bids: [],
    insurance_premium_discount: 0,
    insurance_premium: 0,
    calculated_insurance_premium: 0,
    deductible_enabled: false,
    number_of_installments: 0,
    voucher: "token",
    minimal_premium_reached: 0,
  };
  proposal_coverages: ICoverage[] = [];
  associate_data: IAssociateData = {
    id: 524645,
    brand: "Caloi",
    category: "gravel",
    model: "157",
    price: 0,
    plan: {
      name: "Seguro do Coração",
      amount: 5151,
    },
  };
  program = {
    minimal_premium: 54848,
  };
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.btn {
  color: $main-dark-color !important;
}
</style>
