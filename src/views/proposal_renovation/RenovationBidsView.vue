<template>
  <v-container class="content-container">
    <v-card class="px-0 px-md-5 py-10 mt-5">
      <v-row class="justify-start justify-md-center event-content">
        <div v-if="proposal.program == proposal.program" class="center-block">
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
        </div>
        <div v-else class="center-block">
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
          class="center-block white-block margin-on-off"
        >
          <div class="row row-on-off row-franchise-on-off">
            <div class="container on-off-container">
              <span class="info-on-off">Desativar/Ativar</span>
              <label class="switch">
                <input type="checkbox" id="deductible_id" name="deductible" />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="text-all-franchise">
              <p>
                Utilize esse botão para desabilitar ou habilitar todas as
                frânquias das coberturas
              </p>
            </div>
          </div>
        </div>
        <br />
        <h3 class="title-content">
          Coberturas
          <img
            src="/static/assets/info.svg"
            id="info-covarages"
            width="15px"
            height="15px"
          />
        </h3>
        <div class="center-block">
          <input
            type="hidden"
            id="minimal-premium"
            :default="program.minimal_premium"
          />
          <input
            type="hidden"
            id="proposal-premium"
            :default="proposal.insurance_premium"
          />
          <input
            type="hidden"
            id="iof-tax-rate"
            :default="proposal.program.iof_tax_rate"
          />
          <div
            v-for="coverage in proposal_coverages"
            :key="coverage"
            class="center-block white-block margin-on-off"
          >
            <div class="row row-on-off">
              <div
                v-if="proposal.program.flexible_coverage_enabled"
                class="container on-off-container"
              >
                <span v-if="coverage.is_fixed" class="info-on-off"
                  >Cobertura Básica</span
                >
                <label class="switch">
                  <input
                    type="checkbox"
                    checked
                    :id="coverage.id"
                    name="coverage"
                  />
                  <span class="slider round slider-disabled"></span>
                </label>
                <!-- <span v-else class="info-on-off">Desativar/Ativar</span> -->
                <label class="switch">
                  <input
                    type="checkbox"
                    checked
                    :id="coverage.id"
                    name="coverage"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="row-coverage-name">
                <p>
                  {{ coverage.name }}
                  <img
                    src="{% static './assets/info.svg' %}"
                    :id="'myBtn' + coverage.id"
                  />
                  class="info-coverage" alt="{{ coverage.id }}" width="15px"
                  height="15px"
                </p>
              </div>
              <div class="row row-franchise">
                <p>
                  <strong>Franquia / POS:</strong>
                  {{ coverage.deductible_text }}
                  <img
                    src="{% static './assets/info.svg' %}"
                    :id="'myBtn' + coverage.id"
                    class="info-franchise"
                  />
                  alt="{{ coverage.id }}" width="15px" height="15px" />
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
                    <span class="lmi">
                      {{ coverage.id }}> {{ coverage.lmi }}</span
                    >
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
          <div id="modal-covarages" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>
                Cobertura é a garantia de proteção contra riscos previstos nas
                Apólices/ Certificados/Bilhetes dos seguros.
              </p>
            </div>
          </div>
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>coverage.legal_text</p>
            </div>
          </div>
          <div id="claimModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>
                Participação obrigatória: é a parcela dos prejuízos suportada
                pelo Segurado. A participação obrigatória é deduzida dos
                prejuízos apurados ou indenizáveis, conforme previsto em cada
                uma das coberturas contratadas, havendo ou não perda total.
              </p>
            </div>
          </div>
          <br />
          <div class="values">
            <div v-if="proposal.voucher" class="first-div-values">
              <h3 class="title-content">
                Prêmio bruto total
                <img
                  src="{% static './assets/info.svg' %}"
                  id="info-liquid-premium"
                  width="15px"
                  height="15px"
                />
              </h3>
              <div class="block-content row block-total-premium">
                <p class="total-franchise-payment">
                  R${{ proposal.gross_insurance_premium }}
                </p>
              </div>
            </div>
            <div class="first-div-values">
              <h3 class="title-content">
                Desc. de {{ proposal.voucher }}&#37;:
                <img
                  src="{% static './assets/info.svg' %}"
                  id="info-discount-value"
                  width="15px"
                  height="15px"
                />
              </h3>
              <div class="block-content row block-total-premium">
                <p class="total-franchise-payment">
                  R$ -{{ proposal.insurance_premium_discount }}
                </p>
              </div>
            </div>
            <div v-if="proposal" class="first-div-values">
              <h3 class="title-content">AVISO:</h3>
              <div class="block-content row block-total-premium">
                <p class="total-franchise-payment">
                  Desconto total não aplicado, <br />
                  o prêmio mínimo é R$ 409,99
                </p>
              </div>
            </div>
            <div class="first-div-values">
              <h3 class="title-content">
                Valor do Iof
                <img
                  src="{% static './assets/info.svg' %}"
                  id="info-iof-value"
                  width="15px"
                  height="15px"
                />
              </h3>
              <div class="block-content row block-iof">
                <p class="total-franchise-payment">R$ {{ proposal.iof }}</p>
              </div>
            </div>
            <div class="first-div-values">
              <h3 class="title-content">
                Prêmio a pagar
                <img
                  src="{% static './assets/info.svg' %}"
                  id="info-final-value"
                  width="15px"
                  height="15px"
                />
              </h3>
              <div class="block-content row block-total-premium">
                <p class="total-franchise-payment">
                  <b> R$ {{ proposal.insurance_premium }} </b>
                </p>
              </div>
            </div>
            <div>
              <h3 class="title-content">Em até:</h3>
              <div class="block-content row block-total-premium">
                <p class="total-franchise-payment">
                  <b>
                    number_of_installments x R$
                    proposal.insurance_premium|div:number_of_installments
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div id="modal-liquid-premium" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>
                Termo utilizado para definir o preço final em dinheiro que o
                segurado paga ao segurador, incluídos os encargos (IOF), para
                que este assuma um determinado conjunto de riscos, pagando-lhe
                uma indenização em caso de sinistro
              </p>
            </div>
          </div>
          <div id="modal-iof-value" class="modal">
            <span class="close">&times;</span>
            <p>
              O IOF é a sigla para Imposto sobre Operações Financeiras. Esse
              imposto é calculado sobre o valor do prêmio líquido para se obter
              o valor final do seguro a ser pago (prêmio a pagar)
            </p>
          </div>
          <div id="modal-discount-value" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>Valor a ser descontado do prêmio bruto total</p>
            </div>
          </div>
          <div id="modal-final-value" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>Valor final a ser pago</p>
            </div>
          </div>
          <br />
          <div class="sinister-buttons mobile-display">
            <v-btn class="button primary" />
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
      </v-row>
    </v-card>
  </v-container>
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
    id: 55,
    created_at: "",
    proposal_coverages: [],
    iof: 0,
    gross_insurance_premium: 0,
    associate_data: [],
    program: {
      id: 55,
      name: "Caloi",
      flexible_coverage_enabled: true,
      flexible_deductible_enabled: true,
      image_program: "string",
      minimal_premium: 500,
      iof_tax_rate: 27,
    },
    proposal_bids: [],
    insurance_premium_discount: 0,
    insurance_premium: 0,
    calculated_insurance_premium: 0,
    deductible_enabled: false,
    number_of_installments: 0,
    voucher: "ssd",
  };
  proposal_coverages: ICoverage[] = [];
  associate_data: IAssociateData = {
    id: 524645,
    brand: "Caloi",
    category: "",
    model: "",
    price: 0,
    plan: {
      name: "Seguro do Coração",
      amount: 5151,
    },
  };
  program = {
    minimal_premium: 54848,
  };
  options = {};
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.btn {
  color: $main-dark-color !important;
}
</style>
