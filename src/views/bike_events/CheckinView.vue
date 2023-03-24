<template>
  <v-container class="content-container">
    <v-card class="px-0 px-md-5 py-10 event-info">
      <h3 class="title-content">{{ bike_event.name }}</h3>
      <v-row justify="start">
        <v-col class="col-12 col-md-6 pl-15">
          <strong>Data Inicial:</strong>
          <p>{{ bike_event.initial_date }}</p>
        </v-col>
        <v-col class="col-12 col-md-6 pl-15">
          <strong>Data Final:</strong>
          <p>{{ bike_event.final_date }}</p>
        </v-col>
        <v-col class="col-12 col-md-6 pl-15">
          <strong>Descrição do Evento:</strong>
          <p>{{ bike_event.description }}</p>
        </v-col>
        <!-- <v-col cols="6" class="pl-15">
          <a href="{% url 'bike_event_available_view' pk=bike_event.id %}">
            <img class="event_image" :src="bike_event.poster" />
          </a>
        </v-col> -->
      </v-row>
    </v-card>
    <v-card class="px-0 px-md-5 py-10 event-checkin">
      <h3 class="title-content">Fazer Check-in no evento</h3>
      <v-form class="form" ref="form">
        <v-row class="pa-0 px-10 px-md-10 pt-5">
          <div class="item col-12 justify-center">
            <div class="col-12 col-md-6 sub-item">
              <v-autocomplete
                label="Marca"
                filled
                :items="formItens.brand"
                :rules="obrigatory"
                v-model="form.bike_brand"
                item-text="name"
                item-value="id"
                dense
              ></v-autocomplete>
              <info-dialog
                text="Marca do fabricante da bicicleta Marca do fabricante da bicicleta Marca do fabricante da bicicleta"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12 justify-center">
            <div class="col-12 col-md-6 sub-item">
              <v-select
                label="Categoria"
                filled
                :items="formItens.category"
                :rules="obrigatory"
                v-model="form.bike_category"
                item-text="name"
                item-value="id"
              ></v-select>
              <info-dialog
                text="Categoria de acordo com o modelo da sua bicicleta.
                Pode ser urbana, Mountain Bike (MTB), Estrada, etc."
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12 justify-center">
            <div class="col-12 col-md-6 sub-item">
              <v-combobox
                color="grey"
                filled
                clearable
                open-on-clear
                label="Modelo"
                :items="formItens.model"
                :rules="obrigatory"
                v-model="form.bike_model"
                item-text="description_1"
                item-value="id"
                persistent-hint
              >
              </v-combobox>
              <info-dialog
                text="Caso não encontre aqui seu modelo, favor digita-lo e pressionar Enter."
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12 justify-center">
            <div class="col-12 col-md-6 sub-item">
              <v-file-input
                filled
                label="Foto do lado direito"
                :rules="obrigatory"
                v-model="form.bike_right"
                accept="image/png, image/jpeg"
              ></v-file-input>
              <info-dialog
                text="Mande uma foto do lado direito da sua bike"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
          <div class="item col-12 justify-center">
            <div class="col-12 col-md-6 sub-item">
              <v-file-input
                filled
                label="Foto do lado esquerdo"
                :rules="obrigatory"
                v-model="form.bike_left"
                accept="image/png, image/jpeg"
              ></v-file-input>
              <info-dialog
                text="Mande uma foto do lado esquerdo da sua bike"
                class="info-button"
              >
                <v-icon size="18">mdi-information</v-icon>
              </info-dialog>
            </div>
          </div>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="back-forward">
        <v-row justify="space-between" class="mx-5">
          <v-btn text>Voltar</v-btn>
          <v-btn text class="button" @click="submitForm()"
            >Fazer Check-in</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { Mutation } from "vuex-class";
import { IDialog, MutationTypes } from "@/store";
import { IBrand, ICategory, IModel } from "@/types/bike";
import { IFormCheckin } from "@/types/events";
import { BikeService } from "@/api/bike";
import { EventsService } from "@/api/bikeEvents";
import { formatDateDetail } from "@/utils/utils";

type CallFunctionLoading = (loading: boolean) => void;
type CallFunctionDialog = (payload: IDialog) => void;

const bikeService = new BikeService();
const eventsService = new EventsService();

const form: IFormCheckin = {
  bike_brand: "",
  bike_category: "",
  bike_model: "",
  bike_right: undefined,
  bike_left: undefined,
  bike_event: "5",
};
const formItens = {
  brand: [] as IBrand[],
  category: [] as ICategory[],
  model: [] as IModel[],
  bike_right: File,
  bike_left: File,
};

interface IBikeEvent {
  name: string;
  initial_date: string;
  final_date: string;
  poster: string;
  description: string;
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class Available extends Vue {
  brand?: IBrand;
  form = form;
  formItens = formItens;

  obrigatory = [(v: string) => !!v || "Campo obrigatório"];

  bike_event = {
    name: "Carregando...",
    initial_date: "Carregando...",
    final_date: "Carregando...",
    poster: "Carregando...",
    description: "Carregando...",
  };

  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainDialog!: CallFunctionDialog;

  @Watch("form.bike_brand")
  onBrandChange(val: number, oldVal: number) {
    if (val != oldVal) {
      this.getCategories(this.form.bike_brand || "");
    }
  }
  @Watch("form.bike_category")
  onCategoryChange(val: number, oldVal: number) {
    if (val != oldVal) {
      this.getModels(this.form.bike_brand || "", this.form.bike_category || "");
    }
  }

  async getBrands() {
    this.changeLoading(true);
    const response = await bikeService.getBrands();
    this.formItens.brand = response;
    this.changeLoading(false);
  }
  async getCategories(brand_id: string) {
    this.changeLoading(true);
    const response = await bikeService.getCategories(brand_id);
    this.formItens.category = response;
    this.changeLoading(false);
  }
  async getModels(brand_id: string, category_id: string) {
    this.changeLoading(true);
    const response = await bikeService.getModels(brand_id, category_id);
    this.formItens.model = response;
    this.changeLoading(false);
  }
  async getEvents(bike_event = "") {
    this.changeLoading(true);
    const response = await eventsService.getEvent({
      id: bike_event,
      type: "going",
    });
    response[0].initial_date = formatDateDetail(response[0].initial_date);
    response[0].final_date = formatDateDetail(response[0].final_date);
    this.bike_event = response[0];
    this.changeLoading(false);
  }

  async submitForm() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      const response = await eventsService.doCheckin(this.form);
      if (response.error) {
        this.fail(response);
        this.changeLoading(false);
        return;
      }
    } else {
      this.changeMainDialog({
        msg: "Algo deu errado",
        title: "Ops...",
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
        "Não foi possível continuar com seu check-in",
      title: "Erro!",
      persistent: false,
      active: true,
      bntClose: true,
    });
    this.changeLoading(false);
  }

  created() {
    this.getBrands();
    this.getEvents("5");
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.form {
  margin-bottom: 40px;
}
.back-forward {
  margin-top: 30px;
}
.button {
  color: $main-dark-color !important;
}
.container {
  margin: auto;
}
.item {
  display: flex;
  padding-top: 0px;
  padding-bottom: 0px;
}
.sub-item {
  padding-left: 0px;
  display: flex;
}
.event-info p {
  margin-top: 10px;
  font-size: 0.8em;
}
.event-info strong {
  color: #b5ba3c;
}
.title-content {
  font-weight: 500;
  color: $main-dark-color;
  margin: 0px auto 50px 45px;
}
.event_image {
  transform: translate(-20px, -20px);
  max-width: 200px;
  padding: 10px;
  margin-top: auto;
}
.item::v-deep .info-button {
  margin-top: 0px;
}
.v-icon {
  color: $main-dark-color !important;
}
.v-card {
  margin: auto;
  margin-bottom: 30px;
  max-width: 1080px;
}
</style>
