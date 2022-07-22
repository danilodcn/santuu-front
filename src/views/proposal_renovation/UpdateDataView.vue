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

          <v-stepper-step
            :complete="step > 3"
            step="3"
            v-if="missingImages.length > 0"
          >
            Você deve enviar as seguintes fotos para continuar com a renovação
            <small>
              Abaixo as imagens que estão faltando na sua antiga proposta
            </small>
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-row class="mt-5 justify-start mb-14">
              <template v-for="item in missingImages">
                <v-col
                  cols="6"
                  md="3"
                  class="image-card mx-4 .rounded-lg"
                  :ref="`image-card-${item.image_type}`"
                  @click="openInput(item.image_type)"
                  :key="item.image_type"
                >
                  <v-card>
                    <v-system-bar color="primary" class="image-bar text-center">
                      <p class="images-title ma-0 py-10">
                        {{
                          getImageConfig(item.image_type).showName ||
                          getImageConfig(item.image_type).typeName
                        }}
                      </p>
                    </v-system-bar>
                    <v-img
                      class="mt-3 mb-0 image"
                      contain
                      :src="`http://127.0.0.1:8000/static/assets/prev-images/prev-${
                        getImageConfig(item.image_type).srcImageName
                      }.svg`"
                      :ref="`image-preview-${item.image_type}`"
                      width="100"
                    ></v-img>
                    <v-card-actions class="justify-center">
                      <v-btn
                        text
                        color="primary"
                        class="text-caption text-md-body-2"
                      >
                        Tirar foto
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-form v-show="false" :ref="`formImage-${item.image_type}`">
                    <input
                      type="file"
                      v-show="false"
                      name="file"
                      :ref="`image-${item.image_type}`"
                      accept="image/*"
                      @change="updateImage(item.image_type)"
                    />
                    <input
                      type="hidden"
                      name="identifier"
                      :value="`${item.image_type}`"
                    />
                    <input
                      type="hidden"
                      name="insurance_proposal"
                      :value="`${proposal_id}`"
                    />
                  </v-form>
                </v-col>
              </template>
            </v-row>
            <v-row justify="end" class="ma-0">
              <v-btn text class="mx-2 mx-md-5" @click="step--"> Voltar </v-btn>
              <v-btn
                color="primary"
                class="mx-2 mx-md-5"
                @click="sendAllImages()"
              >
                Avançar
              </v-btn>
            </v-row>
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
import {
  isValidCPF,
  datePast,
  toDDMMYYYY,
  toYYYYMMDD,
  imagesConfig,
} from "@/utils/utils";
import { BaseComponent } from "@/utils/component";
import { IUserData } from "@/types/user";
import { AddressByCepService } from "@/api/addressByCep";
import { AddressService } from "@/api/address";
import { UserDataService } from "@/api/userData";
import { ProposalService } from "@/api/proposal";
import { ProposalImagesService } from "@/api/proposalImages";
import { IAddress } from "@/types/address";

const addressByCepService = new AddressByCepService();
const userDataService = new UserDataService();
const proposalImagesService = new ProposalImagesService();
const proposalService = new ProposalService();
const addressService = new AddressService();

interface IProgramImage {
  id: number;
  image_type_name: string;
  image_type: number;
  is_seller_upload: boolean;
  is_associate_upload: boolean;
  is_new_bike: boolean;
  is_used_bike: boolean;
  program: number;
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class CertificatesView extends BaseComponent {
  menu = false;
  update = false;
  updateAddress = false;
  proposal_id = Number(this.$route.params.proposal_id);
  userId?: number;
  addressId?: number;
  imagesConfig = imagesConfig;
  missingImages = [] as IProgramImage[];

  step = 1;

  isValidCPF = isValidCPF;
  datePast = datePast;
  toDDMMYYYY = toDDMMYYYY;
  toYYYYMMDD = toYYYYMMDD;

  get dateFormatted() {
    return toDDMMYYYY(this.form.birth_date);
  }

  emailConfirmation = "";

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

  formAddress = {
    zipcode: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
  } as IAddress;

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

  async associateData() {
    if (this.validateForm(this.$refs.form) && this.userId) {
      this.changeLoading(true);
      const response = await userDataService.updateUserData(
        this.userId,
        this.form
      );
      if (response.error) {
        this.fail(response);
        this.changeLoading(false);
        return;
      }

      this.addressId = response.address.id;

      this.changeLoading(false);
      this.step++;
    }
  }

  async associateAddress() {
    if (this.validateForm(this.$refs.formAddress) && this.addressId) {
      this.changeLoading(true);
      const response = await addressService.updateAddress(
        this.addressId,
        this.formAddress
      );

      if (response.error) {
        this.fail(response);
        this.changeLoading(false);
        return;
      }

      this.changeLoading(false);
      this.handleImages();
    }
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível continuar com sua renovação",
      title: "Erro",
      persistent: false,
      active: true,
      bntClose: true,
    });
    this.changeLoading(false);
  }

  async handleImages() {
    const response = await proposalImagesService.getMissingImages(
      this.proposal_id
    );
    this.missingImages = response;
    if (this.missingImages.length > 0) {
      this.step++;
    }
  }

  getImageConfig(identifier: number) {
    const imageConfig = imagesConfig.find(
      (element) => element.identifier == identifier
    );
    return imageConfig;
  }

  openInput(identifier: number) {
    const element = (
      this.$refs[`image-${identifier}`] as HTMLInputElement[]
    )[0];
    if (element) {
      element.click();
    }
  }

  updateImage(identifier: number) {
    const imagePreviewElement = (
      this.$refs[`image-preview-${identifier}`] as HTMLImageElement[]
    )[0];
    const imageInput = (
      this.$refs[`image-${identifier}`] as HTMLInputElement[]
    )[0];

    const file = imageInput.files?.item(0);
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    const imagePreviewElementVue = (
      this.$refs[`image-preview-${identifier}`] as Vue[]
    )[0];

    (imagePreviewElementVue.$el as HTMLImageElement).style.width = "100%";

    (imagePreviewElementVue as any).contain = false;
    (imagePreviewElementVue as any).aspectRatio = 1;

    reader.onload = function (e) {
      imagePreviewElement.src = e.target?.result as string;
    };
  }

  sendAllImages() {
    let isValid = true;
    [...Array(13).keys()].forEach((element) => {
      if (this.$refs[`formImage-${element}`] as Vue[]) {
        console.log(this.$refs[`image-card-${element}`] as Vue[]);
        if (
          !(
            (this.$refs[`formImage-${element}`] as Vue[])[0].$el
              .firstChild as HTMLInputElement
          ).files?.length
        ) {
          isValid = false;

          (
            this.$refs[`image-card-${element}`] as HTMLDivElement[]
          )[0].style.border = "1px solid red";
          (
            this.$refs[`image-card-${element}`] as HTMLDivElement[]
          )[0].style.borderRadius = "5px";
        }
      }
    });

    if (!isValid) {
      this.changeMainDialog({
        msg: "Você precisa preencher todas as imagens",
        title: "Atenção",
        persistent: false,
        active: true,
        bntClose: true,
      });
      return false;
    }

    [...Array(13).keys()].forEach((element) => {
      if (this.$refs[`formImage-${element}`] as Vue[]) {
        console.log(this.$refs[`image-card-${element}`] as Vue[]);
        if (
          (
            (this.$refs[`formImage-${element}`] as Vue[])[0].$el
              .firstChild as HTMLInputElement
          ).files?.length
        ) {
          this.sendImage(
            (this.$refs[`formImage-${element}`] as Vue[])[0]
              .$el as HTMLFormElement
          );
        }
      }
    });
  }

  async sendImage(formImage: HTMLFormElement) {
    this.changeLoading(true);
    const response = await proposalImagesService.proposalImages(formImage);
    if (response.error) {
      this.fail(response);
      this.changeLoading(false);
      return;
    }

    this.changeLoading(true);
  }

  async newCep() {
    const response = await addressByCepService.getAddress(
      this.formAddress.zipcode
    );
    this.formAddress.street = response.logradouro;
    this.formAddress.neighborhood = response.bairro;
    this.formAddress.state = response.uf;
    this.formAddress.city = response.localidade;
  }
  async getData() {
    const proposal = await proposalService.getProposal(this.proposal_id);
    this.userId = proposal.associate.id;
    if (this.userId) {
      const response = await userDataService.getUserData(this.userId);
      this.formAddress = response[0].address;
      delete response[0].address;
      this.form = response[0];
      this.emailConfirmation = this.form.email;
    }
  }

  created() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.image-card {
  cursor: pointer;
}
.image-bar {
  line-height: 18px;
  height: 40px !important;
}
.image {
  margin: auto;
  width: 80px;
}
.images-title {
  color: #fff;
  width: 100%;
  font-size: 0.9em;
}
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
  .image-bar {
    line-height: 20px;
  }
  .images-title {
    font-size: 1em;
  }
  .image {
    width: 120px;
  }
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
