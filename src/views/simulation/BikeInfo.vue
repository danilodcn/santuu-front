<template>
  <v-container>
    <v-card class="box-content">
      <v-card-title>
        <h4>Nova Proposta de Seguro</h4>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-container fluid class="content">
            <div class="item">
              <v-autocomplete
                v-model="form.brand"
                attach
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
                v-model="form.price"
                label="Valor"
                prefix="R$ "
                type="number"
                clearable
                hide-spin-buttons
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
              <v-text-field v-model="form.voucher" label="Voucher" clearable>
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
      <v-card-actions class="back-foward">
        <v-row justify="space-between" class="mx-4">
          <v-btn text>Voltar</v-btn>
          <v-btn text class="button" @click="submitForm()">Avançar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>Sistema de Grid de testes</v-card-title>
      <v-card-text>
        <div class="itens-content">
          <v-row justify="center">
            <v-col
              v-for="(n, i) in 10"
              :key="i"
              :class="`item-${n}`"
              cols="12"
              md="3"
            >
              <div class="div-item"></div>
            </v-col>
          </v-row>
        </div>

        <v-card-title>Sistema de Grid de testes</v-card-title>

        <div data-v-a1b74ca6="" class="itens-content">
          <div data-v-a1b74ca6="" class="div-item item-1"></div>
          <div data-v-a1b74ca6="" class="div-item item-2"></div>
          <div data-v-a1b74ca6="" class="div-item item-3"></div>
          <div data-v-a1b74ca6="" class="div-item item-4"></div>
          <div data-v-a1b74ca6="" class="div-item item-5"></div>
          <div data-v-a1b74ca6="" class="div-item item-6"></div>
          <div data-v-a1b74ca6="" class="div-item item-7"></div>
          <div data-v-a1b74ca6="" class="div-item item-8"></div>
          <div data-v-a1b74ca6="" class="div-item item-9"></div>
          <div data-v-a1b74ca6="" class="div-item item-10"></div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { VueRecaptcha } from "vue-recaptcha";
import { IBrand, ICategory, IModel, IStore } from "@/types/bike";
import { IForm, IFormItems } from "@/types/simulation";
import { SimulationHelper } from "@/helper/simulation";
import { BikeService } from "@/api/bike";
import InfoDialog from "@/components/shared/InfoDialog.vue";

const bikeService = new BikeService();
const simulationHelper = new SimulationHelper();

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
export default class HomeView extends Vue {
  form = form;
  formItems = formItems;
  brands: IBrand[] = [];
  search = null;
  recaptchaToken = "";

  isEditing = false;
  model = null;
  dialog = { active: false, title: "", text: "" };

  async getBrands() {
    const response = await bikeService.getBrands();
    this.formItems.brand = response;
  }

  async getCategories(brand_id: string) {
    const response = await bikeService.getCategories(brand_id);
    this.formItems.category = response;
  }

  async getModels(brand_id: string, category_id: string) {
    const response = await bikeService.getModels(brand_id, category_id);
    console.log(response);
    this.formItems.model = response;
  }

  async getStores(brand_id: string, bike_situation: number, program: string) {
    const response = await bikeService.getStores(
      brand_id,
      bike_situation,
      program
    );
    console.log(response);
    this.formItems.originStore = response;
  }

  async onCaptchaVerified(token: string) {
    this.recaptchaToken = token;
    simulationHelper.handle(this.form);
  }

  async onCaptchaExpired() {
    console.log("Não funciona");
    this.recaptchaToken = "";
  }

  async submitForm() {
    if (this.recaptchaToken != "") {
      const data = simulationHelper.handle(this.form);
      const response = await bikeService.getNextStep(data);

      bikeService.generateBid(response.id);
    } else {
      alert("Validação necessária");
    }
  }

  @Watch("select")
  onSelectChange(val: string, oldVal: string) {
    console.log(val, oldVal);
  }

  @Watch("form.situation")
  onSituationChange(val: number, oldVal: number) {
    console.log(val, oldVal);
    if (val != oldVal) {
      this.getCategories(this.form.brand || "");
    }
  }

  @Watch("form.category")
  onCategoryChange(val: number, oldVal: number) {
    console.log(val, oldVal);
    if (val != oldVal) {
      this.getModels(this.form.brand || "", this.form.category || "");
    }
  }

  @Watch("form.model")
  onModelChange(val: string, oldVal: IModel) {
    console.log(val, oldVal, "mudou", this.form.model);
    const description = this.form.model?.description_1;

    if (description) {
      const model = this.formItems.model.filter(
        (a) => a.description_1 == description
      );

      this.form.modelDesc = model[0].description_1;
      this.form.price = (model[0] || model).price;
    } else {
      this.form.modelDesc = val;
      this.form.price = undefined;
    }

    this.getStores(this.form.brand, this.form.situation || 0, "");
  }

  @Watch("form.price")
  onPriceChange(val: string, oldVal: string) {
    console.log(val, oldVal);
  }

  created() {
    console.log("Criando");
    this.getBrands();
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
#captcha {
  margin-left: 40px;
  margin-bottom: 50px;
}
.box-content {
  margin: 30px;
  padding: 50px;
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
.back-foward {
  margin-top: 80px;
}
.info-button {
  top: -5px;
}
.button {
  color: $main-dark-color !important;
}
.div-item {
  width: 100%;
  height: 3rem;
  background-color: rgba(209, 65, 65, 0.733);
}

.itens-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@media (min-width: 960px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
