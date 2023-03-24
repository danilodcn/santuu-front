<template>
  <v-container class="pt-12 px-10">
    <v-row class="col-12">
      <div class="profile">
        <v-btn icon class="mt-auto mb-auto">
          <v-icon large @click.prevent="">mdi-chevron-left</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="200" v-bind="attrs" v-on="on">
              <img
                :src="avatarUrl"
                :alt="`Foto de perfil do ${userData.firstName}`"
              />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="handleFileImport('remove')"
                >Remover</v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="handleFileImport('add')"
                >Enviar nova foto</v-list-item-title
              >
            </v-list-item>
          </v-list>
          <input
            accept="image/*"
            ref="uploader"
            class="d-none"
            type="file"
            @change="onAvatarChanged"
          />
        </v-menu>
      </div>
    </v-row>

    <div class="mt-5">
      <p class="text-center text-h5">Danilo da Conceição Nascimento</p>
    </div>
    <v-container fluid class="mx-auto">
      <v-form ref="form">
        <v-row justify="space-between">
          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.firstName"
              label="Nome"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.lastName"
              label="Sobrenome"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.email"
              label="Email"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.cellPhone"
              v-mask="['(##) #####-####']"
              label="Celular"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.cpf"
              v-mask="'###.###.###-##'"
              label="CPF"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              v-model="userData.rg"
              label="RG"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.birthDate"
              placeholder="AAAA-MM-DD"
              v-mask="'####-##-##'"
              label="Data de nascimento"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-select
              :rules="requiredField"
              v-model="userData.address.state"
              label="Estado"
              :items="stateOptions"
              clearable
            ></v-select>
          </v-col>

          <v-col v-bind="inputProps">
            <v-combobox
              :rules="requiredField"
              v-model="userData.address.city"
              attach
              persistent-hint
              label="Cidade"
              :items="cityOptions"
              clearable
            ></v-combobox>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.address.neighborhood"
              label="Bairro"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.address.zipcode"
              label="CEP"
              v-mask="'#####-###'"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              :rules="requiredField"
              v-model="userData.address.street"
              label="Rua"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              v-model="userData.address.number"
              label="Número"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-text-field
              v-model="userData.address.complement"
              label="Complemento"
              clearable
            ></v-text-field>
          </v-col>

          <v-col v-bind="inputProps">
            <v-select
              :rules="requiredField"
              v-model="userData.address.addressType"
              label="Tipo de endereço"
              :items="addressTypeOptions"
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="mx-4 px-4 pb-0">
            <v-checkbox
              label="Aceito receber comunicação via e-mail com ofertas e benefícios do Clube Santuu e Clube Decatlhon."
              :rules="selectCheckbox"
              :value="userData.emailMessageEnabled"
              v-model="userData.emailMessageEnabled"
            />
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="mx-4 px-4 pb-0">
            <v-checkbox
              label="Aceito receber comunicação via celular."
              :rules="selectCheckbox"
              :value="userData.phoneMessageEnabled"
              v-model="userData.phoneMessageEnabled"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="mb-4" align="center">
            <v-btn color="primary" @click="saveProfile">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";
import { ProfileHandler } from "@/helper/profile";
import { required } from "@/utils/rules";
import axios from "axios";

const profileHandler = new ProfileHandler();

@Component
export default class ProfileView extends BaseComponent {
  userData = profileHandler.userData;
  requiredField = [required];
  selectCheckbox = [
    (value: boolean) => !!value || "Esse campo deve ser marcado!",
  ];
  inputProps = { cols: "12", xs: "8", sm: "6", md: "5", lg: "4" };
  stateOptions = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  addressTypeOptions = [
    "alameda",
    "avenida",
    "chacara",
    "condominio",
    "conjunto",
    "estrada",
    "ladeira",
    "largo",
    "parque",
    "praca",
    "praia",
    "quadra",
    "rodovia",
    "rua",
    "travessa",
    "via",
  ];
  cityOptions: string[] = [];

  get avatarUrl() {
    return (
      this.userData.avatar.url ||
      "https://santuu-landpage.s3.us-east-1.amazonaws.com/default-user-image.png"
    );
  }

  handleFileImport(action: "remove" | "add") {
    if (action == "add") {
      (this.$refs.uploader as Vue & { click(): void }).click();
      this.userData.avatar.delete = false;
    } else {
      this.userData.avatar.file = undefined;
      this.userData.avatar.url = "";
      this.userData.avatar.delete = true;
    }
  }
  onAvatarChanged(e: any) {
    const file = e.target?.files[0];

    this.changeLoading(true);
    if (file) {
      this.userData.avatar.file = file;
      this.userData.avatar.url = URL.createObjectURL(file);
    }
    this.changeLoading(false);
  }
  async getProfile() {
    this.changeLoading(true);
    await profileHandler.getProfile();
    this.changeLoading(false);
  }
  async saveProfile() {
    this.changeLoading(true);
    if (this.formIsValid()) {
      const { error, message } = await profileHandler.saveProfile();

      let title = "Sucesso!";
      if (error) {
        title = "Erro ao atualizar o perfil!";
      }
      this.changeMainDialog({
        active: true,
        bntClose: true,
        title: title,
        msg: message,
        persistent: false,
      });
    } else {
      this.changeLoading(false);
      this.changeMainDialog({
        active: true,
        bntClose: true,
        title: "Erro na validação do formulário!",
        msg: "Campos obrigatórios não preenchidos!",
        persistent: false,
      });
    }
    this.changeLoading(false);
  }
  async getCity(uf: string) {
    this.changeLoading(true);
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`;
    await axios
      .get(url)
      .then((data) => data.data)
      .then((data) => {
        this.cityOptions = data.map((item: any) => item.nome);
      });
    this.changeLoading(false);
  }
  formIsValid() {
    return (this.$refs.form as Vue & { validate: () => boolean })?.validate();
  }
  @Watch("userData.address.state")
  onBrandChange(val: string, oldVal: string) {
    if (val != oldVal) {
      console.log("new value is", val, " and old is ", oldVal);
      this.getCity(val);
    }
  }

  mounted() {
    this.getProfile();
  }
}
</script>

<style lang="scss">
@import "@/scss/main.scss";

.profile {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;
}
</style>
