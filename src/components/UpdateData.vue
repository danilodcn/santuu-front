<template>
  <v-form ref="form" :disabled="!update">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          color="grey"
          filled
          label="CPF"
          v-mask="'###.###.###-##'"
          :rules="obrigatory.concat([(v) => isValidCPF(v) || 'CPF inválido'])"
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
          @change="emailConfirmation = ''"
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
          v-model="emailConfirmation"
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
                  (v) => datePast(form.birth_date) || 'Deve estar no passado',
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
  </v-form>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import {
  isValidCPF,
  datePast,
  toYYYYMMDD,
  toDDMMYYYY,
  validateForm,
  validateEmail,
} from "@/utils/utils";
import { UserDataService } from "@/api/userData";
import { IUserData } from "@/types/user";
import { IAddress } from "@/types/address";

const userDataService = new UserDataService();

@Component({
  components: {
    InfoDialog,
  },
})
export default class UpdateData extends BaseComponent {
  @Prop() update!: boolean;
  @Prop() userId!: number;

  isValidCPF = isValidCPF;
  datePast = datePast;
  toYYYYMMDD = toYYYYMMDD;
  addressId?: number;
  emailConfirmation = "";
  menu = false;

  get dateFormatted() {
    return toDDMMYYYY(this.form.birth_date);
  }

  form = {
    cpf: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    rg: "",
    birth_date: "",
    share_pep_information: false,
    address: {} as IAddress,
  } as IUserData;

  async associateData() {
    if (validateForm(this.$refs.form) && this.userId) {
      this.changeLoading(true);
      const response = await userDataService.updateUserData(
        this.userId,
        this.form
      );
      this.changeLoading(false);
      if (!response.error) {
        return true;
      } else {
        this.fail(response);
        return false;
      }
    }

    return false;
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível realizar esta ação",
      title: "Erro",
      persistent: false,
      active: true,
      bntClose: true,
    });
  }

  emailRule = [
    (v: string) => !!v || "Campo obrigatório",
    (v: string) => validateEmail(v) || "Formato inválido",
  ];

  obrigatory = [(v: string) => !!v || "Campo obrigatório"];

  async getData() {
    if (this.userId) {
      const response = await userDataService.getUserData(this.userId);
      delete response[0].address;
      this.form = response[0];
      this.emailConfirmation = this.form.email;
    }
  }

  @Watch("userId")
  onUserIdChange() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/main.scss";
.input-info {
  width: 90%;
  float: left;
}
.button {
  color: $main-dark-color !important;
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
