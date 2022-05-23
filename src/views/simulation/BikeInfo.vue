<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-card-title>
        <v-row justify="space-between">
          <v-col class="col-4 title"><h4>Nova Proposta de Seguro</h4></v-col>
          <v-col class="col-4"
            ><img class="image_program" :src="program.image_program"
          /></v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-container fluid class="content">
            <div class="item">
              <v-autocomplete
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
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>
            <div class="item">
              <v-select
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
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-autocomplete
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
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-combobox
                v-model="form.model"
                attach
                filled
                label="Modelo"
                :items="formItems.model"
                item-text="description_1"
                persistent-hint
                clearable
                open-on-clear
              >
              </v-combobox>
              <info-dialog
                :text="`Caso não encontre aqui seu modelo, favor digita-lo e pressionar Enter.`"
                class="info-button"
              >
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>
            <div class="item">
              <v-text-field
                filled
                v-model="textPrice"
                :prefix="prefixCurrency"
                label="Valor"
                clearable
                hide-spin-buttons
                @blur="onPriceBlur"
                @focus="onPriceFocus"
              >
              </v-text-field>
              <info-dialog
                :text="`Preço Sugerido ao Consumidor (PSC), 
            definido pelo fabricante em seu website, para o modelo da sua bicicleta no ano vigente... 
            ou seja, o preço da sua bicicleta NOVA.`"
                class="info-button"
              >
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-autocomplete
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
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-text-field
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
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>
          </v-container>
        </v-form>
      </v-card-text>
      <vue-recaptcha
        id="captcha"
        sitekey="6LcAzuUfAAAAAMtsHHnn9o1XvRewVsv6DNAGdjX6"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        language="pt-br"
      ></vue-recaptcha>
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
import { VueRecaptcha } from "vue-recaptcha";
import { IBrand, ICategory, IModel, IStore } from "@/types/bike";
import { IForm, IFormItems, INextStepDTO } from "@/types/simulation";
import { SimulationHelper } from "@/helper/simulation";
import { CurrencyFormatter } from "@/helper/currency";
import { BikeService } from "@/api/bike";
import { ProgramService } from "@/api/program";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { IProgram } from "@/types/program";

const bikeService = new BikeService();
const programService = new ProgramService();
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

@Component({
  components: {
    InfoDialog,
    VueRecaptcha,
  },
  beforeCreate() {
    console.log("Ao criar");
  },
})
export default class BikeInfo extends Vue {
  form = form;
  formItems = formItems;
  brands: IBrand[] = [];
  search = null;
  program_name = this.$route.query.program_name;
  program = {} as IProgram;

  price: string | null = null;
  prefixCurrency = "";

  get textPrice() {
    return this.price;
  }
  set textPrice(value: string | null) {
    if (value == null || value == "") {
      this.prefixCurrency = "";
      this.price = null;
    } else {
      this.prefixCurrency = "R$";
      this.price = value;
    }
  }

  onPriceBlur() {
    this.price = currencyFormatter.toString(Number(this.price), 2);
    this.form.price = currencyFormatter.toNumber(this.price);
  }
  onPriceFocus() {
    this.price = currencyFormatter.resetString(this.price);
    this.form.price = currencyFormatter.toNumber(this.price);
  }

  async getBrands() {
    const response = await bikeService.getBrands();
    this.formItems.brand = response;
  }

  async getCategories(brand_id: string) {
    const response = await bikeService.getCategories(brand_id);
    console.log(321);
    console.log(response);
    this.formItems.category = response;
  }

  async getModels(brand_id: string, category_id: string) {
    const response = await bikeService.getModels(brand_id, category_id);
    this.formItems.model = response;
  }

  async getProgram() {
    const response = await programService.getProgram(this.program_name);
    this.program = response;
  }

  async getStores(brand_id: string, bike_situation: number, program: string) {
    const response = await bikeService.getStores(
      brand_id,
      bike_situation,
      program
    );
    this.formItems.originStore = response;
  }

  async onCaptchaVerified(token: string) {
    this.form.recaptchaToken = token;
    simulationHelper.handle(this.form);
  }

  async onCaptchaExpired() {
    this.form.recaptchaToken = undefined;
  }

  async submitForm() {
    if (this.form.recaptchaToken != "") {
      var data = simulationHelper.handle(this.form);
      const response = await bikeService.getNextStep(data);

      const bid = await bikeService.generateBid(
        response.id,
        this.form.voucher,
        false
      );

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
    } else {
      alert("Validação necessária");
    }
  }

  @Watch("form.situation")
  onSituationChange(val: number, oldVal: number) {
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
      console.log((model[0] || model).price);
      this.form.price = (model[0] || model).price;
      this.form.price = 99;
    } else {
      this.form.modelDesc = val;
      this.form.price = undefined;
    }

    this.getStores(this.form.brand, this.form.situation || 0, "");
  }

  @Watch("price")
  onPriceChange(val: string) {
    console.log(val, "fazer requisição da loja");
  }

  created() {
    this.getBrands();
    this.getProgram();
    console.log(this.program);
  }
  log(event: Event) {
    console.log(event);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
h4 {
  color: #555;
  margin-left: 23px;
  margin-bottom: 30px;
}
.title {
  margin-top: auto;
}
#captcha {
  margin-left: 40px;
  margin-bottom: 50px;
}
.box-content {
  margin: 10px;
  padding: 50px 30px;
  max-width: 1080px;
}
.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
.item {
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
.image_program {
  max-width: 150px;
  max-height: 60px;
}
@media (min-width: 768px) {
  .content {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .box-content {
    margin: 50px;
  }
}
@media (min-width: 1080px) {
  .box-content {
    margin: 50px auto;
  }
}
@media (min-width: 1200px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
