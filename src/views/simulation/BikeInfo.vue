<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row justify="space-between">
        <v-col cols="9" class="title d-md-none d-sm-none d-none d-lg-flex"
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
        <v-form class="px-3" ref="entireForm">
          <v-container fluid class="content">
            <div class="item">
              <v-select
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

            <div class="item">
              <v-autocomplete
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
                :text="'Marca do fabricante da bicicleta Marca do fabricante da bicicleta Marca do fabricante da bicicleta'"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-autocomplete
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
                :text="`Categoria de acordo com o modelo da sua bicicleta.
                Pode ser urbana, Mountain Bike (MTB), Estrada, etc.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-combobox
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
            <div class="item">
              <v-text-field
                color="grey"
                :rules="[
                  (v) =>
                    priceToNumber(v) > 100 ||
                    'O valor não pode ser menor que R$ 100,00',
                ]"
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
                :text="`Preço Sugerido ao Consumidor (PSC), 
            definido pelo fabricante em seu website, para o modelo da sua bicicleta no ano vigente... 
            ou seja, o preço da sua bicicleta NOVA.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-autocomplete
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
                :text="`Loja de origem na qual foi comprada a bike!
                Se sua loja não estiver na lista, selecionar Santuu Bike Store.`"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-text-field
                color="grey"
                filled
                v-model="form.voucher"
                label="Voucher"
                clearable
              >
              </v-text-field>
              <info-dialog
                text="Caso você tenha um voucher promocional insira-o aqui."
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
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
import { IDialog, MutationTypes } from "@/store";

const bikeService = new BikeService();
const qrCodeService = new QRCodeService();
const simulationHelper = new SimulationHelper();
const currencyFormatter = new CurrencyFormatter();

const form: IForm = {
  brand: "",
  situation: undefined,
  category: "",
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
type CallFunctionDialog = (payload: IDialog) => void;

@Component({
  components: {
    InfoDialog,
    VueRecaptcha,
  },
})
export default class BikeInfo extends Vue {
  form = form;
  formItems = formItems;
  brands: IBrand[] = [];
  search = null;
  qrCodeKey = this.$route.query?.key?.toString() || "";
  qrCode = {} as IQRCode;
  program_name = this.$route.query?.program?.toString() || "";

  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainLoading!: CallFunctionDialog;

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
    return Number(price.replaceAll(".", "").replace(",", "."));
  }

  get textPrice() {
    return this.price;
  }
  set textPrice(newValue: string) {
    this.price = currencyFormatter.formatCurrency(newValue);
    this.form.price = this.priceToNumber(this.price);
  }
  //Currency input end

  async getBrands() {
    this.changeLoading(true);
    const program: string = this.$route.query.program?.toString() || "";
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

  async getStores(brand_id: string, bike_situation: number, program: string) {
    this.changeLoading(true);

    const response = await bikeService.getStores(
      brand_id,
      bike_situation,
      program
    );
    this.formItems.originStore = response;
    this.changeLoading(false);
  }

  async onCaptchaVerified(token: string) {
    this.form.recaptchaToken = token;
    simulationHelper.handle(this.form);
  }

  async onCaptchaExpired() {
    this.form.recaptchaToken = undefined;
  }

  async submitForm() {
    (this.$refs.entireForm as Vue & { validate: () => boolean }).validate();

    if (this.form.recaptchaToken != "") {
      this.changeLoading(true);
      var data = simulationHelper.handle(this.form);
      const response = await bikeService.getNextStep(data);

      const bid = await bikeService.generateBid(
        response.id,
        this.form.voucher,
        this.program_name.toLowerCase() == "pqp"
      );

      if (bid.error) {
        this.changeMainLoading({
          msg:
            bid.axiosError.response.data?.error ||
            "Não foi possível continuar com a proposta, verifique o valor preenchido e os outros dados",
          title: "Erro!",
          persistent: false,
          active: true,
          bntClose: true,
        });

        this.changeLoading(false);
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

      await bikeService.getNextStep(_data);

      this.$router.push(`/simulation/proposal-values/${bid.proposal.id}`);

      this.changeLoading(false);
    } else {
      this.changeMainLoading({
        msg: "Validação necessária",
        title: "Erro!",
        persistent: false,
        active: true,
        bntClose: true,
      });
    }
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

  @Watch("form.model")
  onModelChange(val: string) {
    const description = this.form.model?.description_1;

    if (description) {
      const model = this.formItems.model.filter(
        (a) => a.description_1 == description
      );

      this.form.modelDesc = model[0].description_1;
      this.form.price = (model[0] || model).price;
      this.form.modelId = model[0].id;
      this.textPrice = this.form.price.toString().replace(".", ",");
    } else {
      this.form.modelDesc = val;
      this.form.price = undefined;
    }

    this.getStores(this.form.brand, this.form.situation || 0, "");
  }

  // @Watch("price")
  // onPriceChange(val: string) {
  //   console.log(val, "fazer requisição da loja");
  // }

  created() {
    this.changeLoading(true);

    this.getBrands();
    this.getQRCode();
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
  margin: 10px;
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
    margin: 50px;
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
