<template>
  <div>
    <v-container>
      <div class="content">
        <v-row class="pa-0 ma-0 input-area">
          <v-autocomplete
            v-model="model"
            attach
            label="Marca"
            :items="brands"
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
        </v-row>

        <v-row class="pa-0 ma-0 input-area">
          <v-select
            v-model="model"
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
        </v-row>

        <v-row class="pa-0 ma-0 input-area">
          <v-autocomplete
            v-model="model"
            attach
            label="Categoria"
            :items="brands"
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
        </v-row>

        <v-row class="pa-0 ma-0 input-area">
          <v-autocomplete
            v-model="model"
            attach
            label="Modelo"
            :items="brands"
            item-text="name"
            item-value="id"
            persistent-hint
            dense
          >
          </v-autocomplete>
          <info-dialog
            :text="`Caso não encontre aqui seu modelo, favor digita-lo e pressionar Enter.`"
          >
            <v-icon>mdi-information</v-icon>
          </info-dialog>
        </v-row>

        <v-row class="pa-0 ma-0 input-area">
          <v-text-field
            v-model="model"
            label="Valor"
            class="pa-0 ma-0"
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
        </v-row>

        <v-row class="pa-0 ma-0 input-area">
          <v-autocomplete
            v-model="model"
            attach
            label="Loja de origem"
            :items="brands"
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
        </v-row>

        <v-row class="pa-0 ma-0 input-area">
          <v-text-field
            v-model="model"
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
        </v-row>
      </div>
    </v-container>
    {{ model }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Brand, Category, Model, Store } from "../../types/bike";
import { BikeService } from "../../api/bike";
import InfoDialog from "../../components/shared/InfoDialog.vue";

interface IForm {
  brand: Brand;
  situation: number;
  category: Category;
  model: Model;
  price: number;
  originStore: Store;
  voucher: string;
}

interface IFormItems {
  brand: Brand[];
  situation: number;
  category: Category[];
  model: Model[];
  originStore: Store[];
}

const bikeService = new BikeService();

@Component({
  components: {
    InfoDialog,
  },
  beforeCreate() {
    console.log("ao criar");
  },
})
export default class HomeView extends Vue {
  form = {
    brand: {},
  } as IForm;
  formItens = {} as IFormItems;
  brands: Brand[] = [];
  search = null;

  isEditing = false;
  model = null;
  dialog = { active: false, title: "", text: "" };

  async getBrands() {
    console.log("brands");
    const response = await bikeService.getBrands();
    this.brands = response;
  }

  @Watch("select")
  onSelectChange(val: string, oldVal: string) {
    console.log(val, oldVal);
  }

  created() {
    console.log("criando");
    this.getBrands();
  }
}
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.input-area {
  max-width: 100%;
  /* display: flex; */
  /* align-items: center; */
}
</style>
