<template>
  <div>
    <!-- <v-container>
      <v-col>
        <v-row>
          <v-row>
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

          <v-row>
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

          <v-row>
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
        </v-row>

        <v-row>
          <v-row>
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
          <v-row>
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
          </v-row>

          <v-row>
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
        </v-row>

        <v-row>
          <v-row>
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
        </v-row>
      </v-col>
    </v-container>
    {{ model }}
    <v-spacer class="my-6"></v-spacer>
    <v-container>
      <v-card elevation="8">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-row>
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
              <v-row>
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
              <v-row>
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
            </v-col>
            <v-col>
              <v-row>
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
              <v-row>
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
              </v-row>
            </v-col>
            <v-col>
              <v-row>
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

              <v-row>
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
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
    <v-spacer class="ma-8" /> -->
    <v-card>
      <v-card-title>
        <h3>Meu form</h3>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3">
          <v-container fluid class="content">
            <div class="item">
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
            </div>
            <div class="item">
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
            </div>

            <div class="item">
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
            </div>

            <div class="item">
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
            </div>

            <div class="item">
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
            </div>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { IBrand, ICategory, IModel, IStore } from "../../types/bike";
import { BikeService } from "../../api/bike";
import InfoDialog from "../../components/shared/InfoDialog.vue";

interface IForm {
  brand: IBrand;
  situation: number;
  category: ICategory;
  model: IModel;
  price: number;
  originStore: IStore;
  voucher: string;
}

interface IFormItems {
  brand: IBrand[];
  situation: number;
  category: ICategory[];
  model: IModel[];
  originStore: IStore[];
}

const bikeService = new BikeService();

const form: IForm = {
  brand: {} as IBrand,
  situation: 0,
  category: {} as ICategory,
  model: {} as IModel,
  price: 0,
  originStore: {} as IStore,
  voucher: "",
};

@Component({
  components: {
    InfoDialog,
  },
  beforeCreate() {
    console.log("ao criar");
  },
})
export default class HomeView extends Vue {
  form = form;
  formItens = {} as IFormItems;
  brands: IBrand[] = [];
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

  @Watch("form.price")
  onPriceChange(val: string, oldVal: string) {
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

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
