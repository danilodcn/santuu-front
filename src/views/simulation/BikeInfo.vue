<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row justify="space-between">
        <v-col
          cols="9"
          class="title d-md-none d-sm-none d-none d-lg-flex pl-0 pl-md-12"
          ><h5>Nova Proposta de Seguro</h5></v-col
        >
        <v-col cols="12" lg="3"
          ><img class="image-from-qr-code" :src="qrCode.image" />
        </v-col>
      </v-row>
      <v-row class="title d-md-flex d-lg-none">
        <v-col cols="12" class="text-center"
          ><h5>Nova Proposta de Seguro</h5></v-col
        >
      </v-row>
      <v-card-text class="px-0">
        <v-form class="px-3" ref="entireForm" v-model="formIsValid">
          <v-container fluid class="content">
            <div class="item">
              <v-select
                :rules="[(v) => v != undefined || 'Campo obrigatório']"
                color="grey"
                v-model="form.hasNote"
                attach
                filled
                label="Possui nota fiscal?"
                :items="[
                  { has_note: 'Sim', value: true },
                  { has_note: 'Não', value: false },
                ]"
                item-text="has_note"
                item-value="value"
                persistent-hint
              >
              </v-select>
              <info-dialog
                :text="`Sua bike possui nota fiscal?`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote">
              <v-select
                :rules="[
                  (v) => v != undefined || !form.hasNote || 'Campo obrigatório',
                ]"
                color="grey"
                v-model="form.situation"
                attach
                filled
                label="Sua Bike é:"
                :items="[
                  { name: 'Nova', id: 0 },
                  { name: 'Usada', id: 1 },
                ]"
                item-text="name"
                item-value="id"
                persistent-hint
              >
              </v-select>
              <info-dialog
                :text="`Indique se sua bike é nova ou usada! Consideramos bike Nova 
                todas as bicicletas que tem até 60 (sessenta) dias decorridos da data da nota fiscal.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div
              v-if="program_name != 'decathlon'"
              class="item"
              v-show="form.hasNote != undefined"
            >
              <v-autocomplete
                :rules="obrigatory"
                color="grey"
                v-model="form.brand"
                attach
                filled
                label="Marca"
                :items="formItems.brand"
                item-text="name"
                item-value="id"
              >
              </v-autocomplete>
              <info-dialog
                v-if="program_name != 'decathlon'"
                :text="'Marca do fabricante da bicicleta Marca do fabricante da bicicleta Marca do fabricante da bicicleta'"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div
              v-if="program_name != 'decathlon'"
              class="item"
              v-show="form.hasNote != undefined"
            >
              <v-autocomplete
                :rules="obrigatory"
                color="grey"
                v-model="form.category"
                attach
                filled
                label="Categoria"
                :items="formItems.category"
                item-text="name"
                item-value="id"
                persistent-hint
              >
              </v-autocomplete>
              <info-dialog
                v-if="program_name != 'decathlon'"
                :text="`Categoria de acordo com o modelo da sua bicicleta.
                Pode ser urbana, Mountain Bike (MTB), Estrada, etc.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote != undefined">
              <v-combobox
                :rules="obrigatory"
                color="grey"
                v-model="form.model"
                attach
                filled
                label="Modelo"
                :items="formItems.model"
                item-text="description_1"
                item-value="id"
                persistent-hint
                clearable
                open-on-clear
              >
              </v-combobox>
              <info-dialog
                :text="`Caso não encontre aqui seu modelo, favor digita-lo e pressionar Enter.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
            <div class="item" v-show="form.hasNote != undefined">
              <v-text-field
                color="grey"
                :rules="
                  [
                    (v) =>
                      priceToNumber(v) > 100 ||
                      form.hasNote == undefined ||
                      'Valor deve ser maior que R$ 100,00',
                    (v) =>
                      priceToNumber(v) < 200000 ||
                      form.hasNote == undefined ||
                      'Valor deve ser menor que R$ 200 mil',
                  ].concat(obrigatory)
                "
                filled
                v-model="textPrice"
                :prefix="prefixCurrency"
                label="Valor"
                clearable
                hide-spin-buttons
                @focus="selectEnd($event)"
                @click="selectEnd($event)"
                @click:clear="clearCurrency"
              >
              </v-text-field>
              <info-dialog
                v-if="form.hasNote"
                :text="`Preço Sugerido ao Consumidor (PSC), 
            definido pelo fabricante em seu website, para o modelo da sua bicicleta no ano vigente... 
            ou seja, o preço da sua bicicleta NOVA.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
              <info-dialog
                v-if="!form.hasNote"
                :text="`O valor da sua bike deve ser o valor de mercado atual considerando a marca
                , modelo, ano e estado de conservação da bicicleta.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote != undefined">
              <v-text-field
                color="grey"
                filled
                v-model="form.voucher"
                label="Voucher"
                clearable
                @blur="onVoucherBLur"
              >
              </v-text-field>
              <info-dialog
                text="Caso você tenha um voucher promocional insira-o aqui."
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote != undefined">
              <v-autocomplete
                :rules="obrigatory"
                color="grey"
                v-model="form.originStore"
                attach
                filled
                label="Loja de origem"
                :items="formItems.originStore"
                item-text="trading_name"
                item-value="id"
                persistent-hint
              >
              </v-autocomplete>
              <info-dialog
                :text="`Loja de origem na qual foi comprada a bike ou parceiro que indicou a Santuu.
                Se sua loja ou parceiro não estiver na lista, selecionar Santuu Bike Store.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote == false">
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
                      [
                        (v) =>
                          datePast(form.acquisitionDate) ||
                          form.hasNote != false ||
                          'Deve estar no passado',
                      ].concat(obrigatoryNoNote)
                    "
                    v-model="dateFormatted"
                    @blur="form.acquisitionDate = toYYYYMMDD(dateFormatted)"
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
                  v-model="form.acquisitionDate"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              <info-dialog
                text="Data em que a bike foi adquirida."
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote == false">
              <v-text-field
                :rules="[
                  (v) =>
                    (v && v.length == 4) ||
                    form.hasNote != false ||
                    'Formato: YYYY',
                  (v) =>
                    (v > 1900 && v < 2100) ||
                    form.hasNote != false ||
                    'Data incorreta',
                ]"
                color="grey"
                filled
                type="number"
                @keyup="maskedManufactureYear($event.target)"
                v-model="form.manufactureYear"
                label="Ano de Fabricação:"
                clearable
              >
              </v-text-field>
              <info-dialog
                text="Ano em que a bike foi fabricada."
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote == false">
              <v-select
                :rules="obrigatoryNoNote"
                color="grey"
                v-model="form.isOrigin"
                attach
                filled
                label="Original de fábrica?"
                :items="[
                  { isOrigin: 'Sim', value: 1 },
                  { isOrigin: 'Não', value: 2 },
                ]"
                item-text="isOrigin"
                item-value="value"
                persistent-hint
              >
              </v-select>
              <info-dialog
                text="A sua bicicleta é original de fábrica?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote == false">
              <v-select
                :rules="obrigatoryNoNote"
                color="grey"
                v-model="form.stemComposal"
                attach
                filled
                label="Material do quadro:"
                :items="[
                  { stemComposal: 'Metal', value: 1 },
                  { stemComposal: 'Alumínio', value: 2 },
                  { stemComposal: 'Carbono', value: 3 },
                ]"
                item-text="stemComposal"
                item-value="value"
                persistent-hint
              >
              </v-select>
              <info-dialog
                text="Qual materia do quadro da sua bike?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote == false">
              <v-select
                :rules="obrigatoryNoNote"
                color="grey"
                v-model="form.isElectrical"
                attach
                filled
                label="A bicicleta é elétrica?"
                :items="[
                  { isElectrical: 'Sim', value: 1 },
                  { isElectrical: 'Não', value: 2 },
                ]"
                item-text="isElectrical"
                item-value="value"
                persistent-hint
              >
              </v-select>
              <info-dialog
                text="A sua bicicleta é eletrica?"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item" v-show="form.hasNote != undefined">
              <vue-recaptcha
                id="captcha"
                sitekey="6LcAzuUfAAAAAMtsHHnn9o1XvRewVsv6DNAGdjX6"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
                language="pt-br"
              ></vue-recaptcha>
            </div>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="back-forward">
        <v-row justify="space-between" class="mx-4">
          <v-btn text>Voltar</v-btn>
          <v-btn
            text
            class="button"
            @click="submitForm()"
            :loading="form.loading"
            >Avançar</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { VuePlus, datePast, toDDMMYYYY, toYYYYMMDD } from "@/utils/utils";
import { Mutation } from "vuex-class";
import { VueRecaptcha } from "vue-recaptcha";
import { IBrand, ICategory, IModel, IStore } from "@/types/bike";
import { IForm, IFormItems, INextStepDTO } from "@/types/simulation";
import { SimulationHelper } from "@/helper/simulation";
import { CurrencyFormatter } from "@/utils/currency";
import { BikeService } from "@/api/bike";
import { QRCodeService } from "@/api/qr_code";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { IQRCode } from "@/types/qr_code";
import { MutationTypes } from "@/store";

const bikeService = new BikeService();
const qrCodeService = new QRCodeService();
const simulationHelper = new SimulationHelper();
const currencyFormatter = new CurrencyFormatter();

const form: IForm = {
  brand: "",
  situation: undefined,
  category: "",
  hasNote: undefined,
  acquisitionDate: undefined,
  manufactureYear: "",
  isOrigin: undefined,
  stemComposal: undefined,
  isElectrical: undefined,
  model: undefined,
  modelDesc: "",
  modelId: "",
  price: undefined,
  originStore: "",
  voucher: "",
  recaptchaToken: "",
  loading: false,
};

const formItems: IFormItems = {
  brand: [] as IBrand[],
  category: [] as ICategory[],
  model: [] as IModel[],
  originStore: [] as IStore[],
};

type CallFunctionLoading = (loading: boolean) => void;

@Component({
  components: {
    InfoDialog,
    VueRecaptcha,
  },
})
export default class BikeInfo extends VuePlus {
  menu = false;
  form = form;
  formItems = formItems;
  brands: IBrand[] = [];
  search = null;
  qrCodeKey = this.$route.query?.key?.toString() || "";
  qrCode = {} as IQRCode;
  program_name = this.$route.query?.program?.toString() || "";
  todayDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  formIsValid = false;

  datePast = datePast;
  toDDMMYYYY = toDDMMYYYY;
  toYYYYMMDD = toYYYYMMDD;

  get dateFormatted() {
    return toDDMMYYYY(this.form.acquisitionDate);
  }

  obrigatory = [];
  obrigatoryNote = [];
  obrigatoryNoNote = [];

  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;

  //Currency input
  price = "0,00";
  prefixCurrency = "";

  selectEnd(event: any) {
    event.target.selectionStart = event.target.selectionEnd =
      event.target.value.length;
  }

  clearCurrency() {
    this.textPrice = "0,00";
  }

  priceToNumber(price: string): number {
    return Number(price?.replaceAll(".", "").replace(",", "."));
  }

  get textPrice() {
    return this.price;
  }
  set textPrice(newValue: string) {
    this.price = currencyFormatter.formatCurrency(newValue);
    this.form.price = this.priceToNumber(this.price);
  }
  //Currency input end

  //Year input start
  maskedManufactureYear(target: HTMLInputElement) {
    this.form.manufactureYear = target.value.substring(0, 4);
  }
  //Year input end

  async getBrands() {
    this.changeLoading(true);
    const program: string = this.program_name;
    const response = await bikeService.getBrands(program);
    this.formItems.brand = response;
    this.changeLoading(false);
  }

  async getCategories(brand_id: string) {
    this.changeLoading(true);

    const response = await bikeService.getCategories(brand_id);
    this.formItems.category = response;

    this.changeLoading(false);
  }

  async getModels(brand_id: string, category_id: string) {
    this.changeLoading(true);

    const response = await bikeService.getModels(brand_id, category_id);
    this.formItems.model = response;

    this.changeLoading(false);
  }

  async getQRCode() {
    this.changeLoading(true);

    const response = await qrCodeService.getQRCode(this.qrCodeKey);
    this.qrCode = response;

    this.changeLoading(false);
  }

  async getStores(
    brand_id: string,
    bike_situation: number,
    program: string,
    voucher: string
  ) {
    this.changeLoading(true);

    const response = await bikeService.getStores(
      brand_id,
      bike_situation,
      program,
      voucher
    );
    this.formItems.originStore = response;
    this.changeLoading(false);
  }

  async onVoucherBLur() {
    if (this.form.voucher == "") {
      return null;
    }

    this.getStores(
      this.form.brand,
      this.form.situation || 0,
      this.program_name,
      this.form.voucher
    );

    const voucher = await bikeService.getVoucherInfo(this.form.voucher);
    let message, title, persistent;

    if (voucher.isValid) {
      const date = new Date(voucher.expirationDate);
      const formattedDate = date
        .toISOString()
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
      message = `O voucher selecionado é válido até o dia ${formattedDate} e possui desconto de <strong>${voucher.discountPercentage}%</strong>`;
      title = "Sucesso!";
      persistent = false;
    } else {
      this.form.voucher = "";
      message = "Esse voucher não é válido! <strong>Tente outro!</strong>";
      title = "Erro!";
      persistent = true;
    }
    this.changeMainDialog({
      active: true,
      bntClose: true,
      msg: message || "",
      persistent,
      title,
    });
  }

  async onCaptchaVerified(token: string) {
    this.form.recaptchaToken = token;
    simulationHelper.handle(this.form);
  }

  async onCaptchaExpired() {
    this.form.recaptchaToken = "";
  }

  async submitForm() {
    if (
      !(this.$refs.entireForm as Vue & { validate: () => boolean }).validate()
    ) {
      return;
    }
    if (this.form.recaptchaToken != "") {
      this.changeLoading(true);

      const description = this.form.model?.description_1;
      if (this.program_name == "decathlon") {
        const item = this.formItems.model.filter(
          (a) => a.description_1 == description
        );
        this.form.category = String(item[0].category);
        this.form.brand = String(item[0].brand);
      }

      var proposal_id: number;
      if (form.hasNote) {
        const data = simulationHelper.handle(this.form);
        const response = await bikeService.getNextStep(data);
        proposal_id = response.id;

        if (response.error) {
          this.fail(response);
          return;
        }

        const bid = await bikeService.generateBid(
          proposal_id,
          this.form.voucher,
          this.program_name.toLowerCase() == "pqp"
        );

        if (bid.error) {
          this.fail(bid);
          return;
        }

        const _data: INextStepDTO = {
          action: 0,
          recaptchaToken: this.form.recaptchaToken,
          insurance_premium: bid.proposal.insurance_premium,
          proposal: {
            associate_bikes: response.associate_bikes,
            partner_step: bid.proposal.partner_step,
            status: bid.proposal.status,
            id: bid.proposal.id,
            associate_step: 1,
            chosen_bid_id: bid.chosen_bid_id,
            proposal_images: [],
            proposal_coverages: [],
          },
        };

        const secondResponse = await bikeService.getNextStep(_data);

        if (secondResponse.error) {
          this.fail(secondResponse);
          return;
        }
      } else {
        const data = simulationHelper.handleNoNote(this.form);
        const response = await bikeService.setAssociateBike(data);
        proposal_id = response.proposal_id;

        if (response.error) {
          this.fail(response);
          return;
        }
      }

      this.changeLoading(false);
      this.$router.push(`/simulation/proposal-values/${proposal_id}`);
    } else {
      this.changeMainDialog({
        msg: "Validação necessária!",
        title: "Erro!",
        persistent: false,
        active: true,
        bntClose: true,
      });
    }
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível continuar com a proposta, verifique o valor preenchido e os outros dados!",
      title: "Erro!",
      persistent: false,
      active: true,
      bntClose: true,
    });
    this.changeLoading(false);
  }
  resetPrice() {
    this.form.price = 0;
    this.textPrice = "00,00";
  }

  @Watch("form.brand")
  onBrandChange(val: number, oldVal: number) {
    if (val != oldVal) {
      this.getCategories(this.form.brand || "");
    }
  }

  @Watch("form.category")
  onCategoryChange(val: number, oldVal: number) {
    if (val != oldVal) {
      this.getModels(this.form.brand || "", this.form.category || "");
    }
  }

  @Watch("form.situation")
  onSituationChange(val: string, oldVal: string) {
    if (val != oldVal) {
      if (this.program_name == "decathlon") {
        this.getModels("598,595,338,51,361,553", "1,2,4,10,11,3"); // ids das marcas e categorias pra ser usar na jornada decathlon
      }
    }
  }

  @Watch("form.hasNote")
  onHasNoteChange(val: boolean, oldVal: boolean) {
    (
      this.$refs.entireForm as Vue & { resetValidation: () => boolean }
    ).resetValidation();

    if (val == false) {
      this.resetPrice();
      this.requestAcceptTerms({
        message: `<b>1 -</b> O Seguro Clube Santuu, Sem Nota, é um seguro feito pelo LMI (Limite Máximo de Indenização) determinado pelo cliente e de acordo com configurações e ano da bicicleta, considerando a depreciação pelo uso.
              <br/><b>2 -</b> Em caso de sinistro total ou parcial, o reembolso será em dinheiro, de acordo com cobertura acionada e LMI (Limite Máximo de Indenização) aceito.
              <br/><b>3 -</b> Nesta modalidade de seguro Sem Nota, NÃO haverá reposição do bem por item igual ou similar ao Novo como no produto convencional do Clube Santuu
              <br/><b>4 -</b> O cliente, ao aceitar esse termo, garante que o produto, apesar de não ter nota fiscal, não é um produto proveniente de roubo/furto ou ato ilícito. A procedência do produto é 100% garantida pelo cliente que está solicitando o seguro.`,
        messageOk: "Continuar",
        messageCancel: "Voltar",
        disagreeFunction: () => {
          (this.$refs.entireForm as Vue & { reset: () => boolean }).reset();
        },
      });
    }
  }

  @Watch("form.model")
  onModelChange(val: string) {
    const description = this.form.model?.description_1;

    if (description) {
      const model = this.formItems.model.filter(
        (a) => a.description_1 == description
      );

      this.form.modelDesc = model[0].description_1;
      this.form.modelId = model[0].id;
      if (this.form.hasNote) {
        this.form.price = (model[0] || model).price;
        this.textPrice = this.form.price.toString().replace(".", ",");
      } else {
        this.resetPrice();
      }
    } else {
      this.form.modelDesc = val;
      this.form.price = undefined;
    }

    this.getStores(
      this.form.brand,
      this.form.situation || 0,
      this.program_name,
      ""
    );
  }

  async created() {
    this.changeLoading(true);

    await this.getBrands();
    await this.getQRCode();
    this.form.voucher = this.$route.query?.voucher?.toString() || "";

    this.changeLoading(false);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.item {
  margin: auto;
  max-width: 300px;
}
h5 {
  color: #444;
}
.title {
  margin: auto 0px;
}
#row-captcha {
  justify-content: center;
}
#captcha {
  width: 100%;
  transform: translateY(0px) translateX(-30px) scale(0.8);
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
.item {
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.back-forward {
  margin-top: 80px;
}
.button {
  color: $main-dark-color !important;
}
.item::v-deep .info-button {
  margin-top: -20px !important;
}
.image-from-qr-code {
  margin: auto;
  display: block;
  max-width: 60px;
  max-height: 60px;
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
  #row-captcha {
    margin-left: 40px;
    justify-content: inherit;
  }
  #captcha {
    transform: translateY(-15px) translateX(-30px) scale(0.8);
  }
}
@media (min-width: 1300px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  #captcha {
    transform: translateY(-15px) translateX(-15px) scale(0.9);
  }
}
</style>
