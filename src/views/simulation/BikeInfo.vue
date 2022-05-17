<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h3>Meu form</h3>
      </v-card-title>
      {{ form }}
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
                dense
              >
              </v-autocomplete>
              <info-dialog
                :text="'Marca do fabricante da bicicleta Marca do fabricante da bicicleta Marca do fabricante da bicicleta'"
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
                dense
              >
              </v-select>
              <info-dialog
                :text="`Indique se sua bike é nova ou usada! Consideramos bike Nova 
                todas as bicicletas que tem até 60 (sessenta) dias decorridos da data da nota fiscal.`"
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
                dense
              >
              </v-autocomplete>
              <info-dialog
                :text="`Categoria de acordo com o modelo da sua bicicleta.
                Pode ser urbana, Mountain Bike (MTB), Estrada, etc.`"
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
                item-value="description_1"
                persistent-hint
                dense
                clearable
                open-on-clear
              >
              </v-combobox>
              <info-dialog
                :text="`Caso não encontre aqui seu modelo, favor digita-lo e pressionar Enter.`"
              >
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>
            <div class="item">
              <v-text-field
                v-model="form.price"
                label="Valor"
                class="pa-0 ma-0"
                prefix="R$ "
                type="number"
                clearable
              >
              </v-text-field>
              <info-dialog
                :text="`Preço Sugerido ao Consumidor (PSC), 
            definido pelo fabricante em seu website, para o modelo da sua bicicleta no ano vigente... 
            ou seja, o preço da sua bicicleta NOVA.`"
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
                item-text="name"
                item-value="id"
                persistent-hint
                dense
              >
              </v-autocomplete>
              <info-dialog
                :text="`Loja de origem na qual foi comprada a bike!
                Se sua loja não estiver na lista, selecionar Santuu Bike Store.`"
              >
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>

            <div class="item">
              <v-text-field
                v-model="form.voucher"
                label="Voucher"
                class="pa-0 ma-0"
                clearable
              >
              </v-text-field>
              <info-dialog
                text="Caso voce tenha um voucher promocional insira-o aqui."
              >
                <v-icon>mdi-information</v-icon>
              </info-dialog>
            </div>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="pa-3">
      <vue-recaptcha
        sitekey="6LcAzuUfAAAAAMtsHHnn9o1XvRewVsv6DNAGdjX6"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        language="pt-br"
      ></vue-recaptcha>
      <v-spacer class="my-6" />
      <v-card-actions>
        <v-row justify="space-between" class="mx-4">
          <v-btn text>Voltar</v-btn>
          <v-btn text color="primary" @click="alert('Ola')">Avançar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { VueRecaptcha } from "vue-recaptcha";
import { IBrand, ICategory, IModel, IStore } from "../../types/bike";
import { BikeService } from "../../api/bike";
import InfoDialog from "../../components/shared/InfoDialog.vue";

interface IForm {
  brand: string;
  situation: null | number;
  category: string;
  model: string | IModel;
  price: number;
  originStore: IStore;
  voucher: string;
}

interface IFormItems {
  brand: IBrand[];
  category: ICategory[];
  model: IModel[];
  originStore: IStore[];
}

const bikeService = new BikeService();

const form: IForm = {
  brand: "",
  situation: null,
  category: "",
  model: "",
  price: 0,
  originStore: {} as IStore,
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
    console.log("ao criar");
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

  async onCaptchaVerified(token: string) {
    this.recaptchaToken = token;
  }

  async onCaptchaExpired() {
    console.log("nao funciona");
    this.recaptchaToken = "";
  }

  alert(value: string) {
    if (this.recaptchaToken != "") {
      alert(value);
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
  onModelChange(val: number, oldVal: number) {
    console.log(val, oldVal, "mudou", this.form.model);
    // if (val != oldVal) {
    //   const description = this.form.model?.description_1 || this.form.model;
    //   const model = this.formItems.model.filter(
    //     (a) => a.description_1 == description
    //   );
    //   this.form.price = (model[0] || model).price;
    // }
  }

  @Watch("form.price")
  onPriceChange(val: string, oldVal: string) {
    console.log(val, oldVal);
  }

  created() {
    console.log("criando");
    this.getBrands();
  }
  log(event: Event) {
    console.log(event);
  }
}
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
