<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"><h3 class="title-content">Associar dados</h3></v-col>
      </v-row>
      <v-card-text class="pl-0">
        <v-stepper v-model="step" vertical class="mx-0 mx-md-8 elevation-0">
          <v-stepper-step :complete="step > 1" step="1">
            Associar dados
            <v-btn
              class="update-button"
              elevation="0"
              color="white"
              @click="update = true"
              v-if="step == 1"
              >Editar</v-btn
            >
            <small>Mantenha os dados antigos ou atualize-os</small>
          </v-stepper-step>

          <v-stepper-content step="1" class="mb-4">
            <v-form ref="form" :disabled="!update">
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
                <v-col cols="12" md="6">
                  <v-text-field
                    color="grey"
                    filled
                    label="E-mail"
                    name="email"
                    @change="form.emailConfirmation = ''"
                    v-model="form.email"
                    validate-on-blur
                    :rules="emailRule"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    color="grey"
                    filled
                    label="Confirmação de e-mail"
                    name="emailConfirmation"
                    v-model="form.emailConfirmation"
                    validate-on-blur
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
                <v-col cols="12" md="3">
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
                <v-col cols="12" md="3">
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
                <v-col cols="12" md="3">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    class="pa-0 ma-0"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :rules="
                          obrigatory.concat([
                            (v) =>
                              datePast(form.birth_date) ||
                              'Deve estar no passado',
                          ])
                        "
                        v-model="dateFormatted"
                        @blur="form.birth_date = toYYYYMMDD(dateFormatted)"
                        label="Data de Aquisição:"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        color="grey"
                        filled
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.birth_date"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="5">
                  <v-select
                    class="input-info"
                    :rules="[(v) => v != null || 'Campo obrigatório']"
                    color="grey"
                    v-model="form.share_pep_information"
                    attach
                    filled
                    label="Exposto(a) politicamente?"
                    :items="[
                      { exposed: 'Sim', value: true },
                      { exposed: 'Não', value: false },
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
                <v-btn text class="mx-2 mx-md-5"> Voltar </v-btn>
                <v-btn
                  color="primary"
                  class="mx-2 mx-md-5"
                  @click="associateData()"
                >
                  Avançar
                </v-btn>
              </v-row>
            </v-form>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Associar endereço
            <v-btn
              class="update-button"
              elevation="0"
              color="white"
              @click="updateAddress = true"
              v-if="step == 2"
              >Editar</v-btn
            >
            <small>Mantenha o endereço antigo ou atualize-o</small>
          </v-stepper-step>

          <v-stepper-content step="2" class="mb-4">
            <v-form ref="formAddress" :disabled="!updateAddress">
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    color="grey"
                    filled
                    label="CEP"
                    v-mask="'#####-###'"
                    :rules="obrigatory"
                    v-model="formAddress.zipcode"
                    @change="newCep()"
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
                    label="Estado"
                    :rules="obrigatory"
                    v-model="formAddress.state"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Cidade"
                    :rules="obrigatory"
                    v-model="formAddress.city"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Bairro"
                    :rules="obrigatory"
                    v-model="formAddress.neighborhood"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Rua"
                    :rules="obrigatory"
                    v-model="formAddress.street"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    color="grey"
                    filled
                    label="Número"
                    :rules="obrigatory"
                    v-model="formAddress.number"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    color="grey"
                    filled
                    label="Complemento"
                    :rules="obrigatory"
                    v-model="formAddress.complement"
                    clearable
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-row justify="end" class="ma-0">
              <v-btn text class="mx-2 mx-md-5" @click="step--"> Voltar </v-btn>
              <v-btn
                color="primary"
                class="mx-2 mx-md-5"
                @click="associateAddress()"
              >
                Avançar
              </v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">
            Você deve enviar as seguintes fotos para continuar com a renovação
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="1"> Continue </v-btn>
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
import { isValidCPF, datePast, toDDMMYYYY, toYYYYMMDD } from "@/utils/utils";
import { AddressService } from "@/api/addressByCep";
import { UserDataService } from "@/api/userData";

const addressService = new AddressService();
const userDataService = new UserDataService();

@Component({
  components: {
    InfoDialog,
  },
})
export default class CertificatesView extends Vue {
  menu = false;
  update = false;
  updateAddress = false;
  proposal_id = this.$route.params.proposal_id;

  step = 1;

  isValidCPF = isValidCPF;
  datePast = datePast;
  toDDMMYYYY = toDDMMYYYY;
  toYYYYMMDD = toYYYYMMDD;

  get dateFormatted() {
    return toDDMMYYYY(this.form.birth_date);
  }

  form = {
    cpf: "",
    first_name: "",
    last_name: "",
    email: "",
    emailConfirmation: "",
    phone: "",
    rg: "",
    birth_date: "",
    share_pep_information: "",
  };

  formAddress = {
    zipcode: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
  };

  emailRule = [
    (v: string) => !!v || "Campo obrigatório",
    (v: string) => this.validateEmail(v) || "Formato inválido",
  ];

  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  birthDateRule = [
    (v: string) => !!v || "Campo obrigatório",
    (v: string) => this.validateDate(v) || "Data inválida",
  ];

  validateDate(date: string) {
    const dateParts = date.split("/");
    const dateObject = new Date(
      +dateParts[2],
      Number(dateParts[1]) - 1,
      +dateParts[0]
    );
    const diff =
      (new Date().getTime() - dateObject.getTime()) / (1000 * 3600 * 24 * 365);
    return diff > 10 && diff < 110;
  }

  obrigatory = [(v: string) => !!v || "Campo obrigatório"];

  validateForm(form: Vue | Element | (Vue | Element)[] | undefined) {
    return (form as Vue & { validate: () => boolean }).validate();
  }

  associateData() {
    if (this.validateForm(this.$refs.form)) {
      this.step++;
    }
  }

  associateAddress() {
    if (this.validateForm(this.$refs.formAddress)) {
      this.handleImages();
    }
  }

  handleImages() {
    return;
  }

  async newCep() {
    const response = await addressService.getAddress(this.formAddress.zipcode);
    this.formAddress.street = response.logradouro;
    this.formAddress.neighborhood = response.bairro;
    this.formAddress.state = response.uf;
    this.formAddress.city = response.localidade;
  }

  async getData() {
    const response = await userDataService.getUserData();
    this.form = response[0];
    this.form.emailConfirmation = this.form.email;
    this.formAddress = response[0].address;
  }

  created() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.update-button {
  margin-left: 10% !important;
  color: $main-dark-color;
}
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
  .update-button {
    margin-left: 70% !important;
    color: $main-dark-color;
  }
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
