<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"><h3 class="title-content">Associar dados</h3></v-col>
      </v-row>
      <v-card-text>
        <v-stepper v-model="e6" vertical class="mx-8 elevation-0">
          <v-stepper-step :complete="e6 > 1" step="1">
            Associar dados
            <small>Mantenha os dados antigos ou atualize-os</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-form ref="form">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="CPF"
                    v-mask="'###.###.###-##'"
                    :rules="
                      obrigatory.concat([
                        (v) => isValidCPF(v) || 'CPF inválido',
                      ])
                    "
                    v-model="form.cpf"
                    clearable
                    hide-spin-buttons
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Primeiro Nome"
                    :rules="obrigatory"
                    v-model="form.first_name"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Sobrenome"
                    :rules="obrigatory"
                    v-model="form.last_name"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="E-mail"
                    name="email"
                    @change="form.emailConfirmation = ''"
                    v-model="form.email"
                    :rules="emailRule"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Confirmação de e-mail"
                    name="emailConfirmation"
                    v-model="form.emailConfirmation"
                    :rules="
                      emailRule.concat([
                        (v) => v == form.email || 'Os emails devem coincidir',
                      ])
                    "
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Telefone"
                    :rules="obrigatory"
                    v-model="form.phone"
                    v-mask="'(##) #####-####'"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                {{ form.rg | VMask("##.##..##") }}
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="RG"
                    :rules="obrigatory"
                    v-model="form.rg"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Data de Nascimento"
                    :rules="obrigatory"
                    v-model="form.birth_date"
                    v-mask="'##/##/####'"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    class="input-info"
                    :rules="obrigatory"
                    color="grey"
                    v-model="form.pep"
                    attach
                    filled
                    label="Exposto(a) politicamente?"
                    :items="[
                      { exposed: 'Sim', value: 1 },
                      { exposed: 'Não', value: 0 },
                    ]"
                    item-text="exposed"
                    item-value="value"
                    persistent-hint
                  >
                  </v-select>
                  <info-dialog
                    text="É considerada um PEP ou Pessoa Exposta Politicamente, aquela que desempenha ou desempenhou nos últimos cinco anos anteriores, no Brasil ou em países, territórios e dependências estrangeiros, cargos, empregos ou funções públicas relevantes."
                    class="info-button"
                  >
                    <v-icon size="18">mdi-information</v-icon>
                  </info-dialog>
                </v-col>
              </v-row>
              <v-row justify="end" class="ma-0">
                <v-btn text class="mx-5"> Cancel </v-btn>
                <v-btn color="primary" class="mx-5" @click="e6 = 2">
                  Continue
                </v-btn>
              </v-row>
            </v-form>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Associar endereço
            <small>Mantenha o endereço antigo ou atualize-o</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height="200px">
              cep, estado, cidade, bairro, rua, número, complemento
            </v-card>
            <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Você deve enviar as seguintes fotos para continuar com a renovação
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
      <v-divider class="mt-15"></v-divider>
      <v-card-actions class="back-forward">
        <v-row justify="space-between" class="mx-4">
          <v-btn text>Voltar</v-btn>
          <v-btn text class="button" disabled>Avançar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { MutationTypes, IDialog } from "@/store";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { isValidCPF } from "@/utils/utils";

@Component({
  components: {
    InfoDialog,
  },
})
export default class CertificatesView extends Vue {
  isValidCPF = isValidCPF;
  form = {
    cpf: "",
    first_name: "",
    last_name: "",
    email: "",
    emailConfirmation: "",
    phone: "",
    rg: "",
    birth_date: "",
    pep: "",
  };

  emailRule = [
    (v: string) => !!v || "Campo obrigatório",
    (v: string) =>
      // eslint-disable-next-line
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Formato inválido",
  ];

  obrigatory = [(v: string) => !!v || "Campo obrigatório"];

  validateForm() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  e6 = 1;
  created() {
    return 1;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.input-info {
  width: 90%;
  float: left;
}
.title-content {
  font-weight: 500;
  color: $main-dark-color;
  margin: 0px auto 0px 12px;
}
.title {
  margin: auto 0px;
}
.box-content {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  padding: 50px 0px;
  max-width: 1080px;
}
.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
.back-forward {
  margin-top: 80px;
}
.button {
  color: $main-dark-color !important;
}
@media (min-width: 1160px) {
  .content {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .box-content {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    padding: 50px 30px;
  }
  .title-content {
    margin: 0px auto 0px 55px;
  }
}
@media (min-width: 1300px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
<style>
.info-button {
  margin-top: 20px;
  margin-left: 5px;
  min-width: 0px !important;
  width: 20px !important;
  height: 20px !important;
}
</style>
