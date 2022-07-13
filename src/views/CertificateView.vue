<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"><h5>Meus Certificados</h5></v-col>
      </v-row>
      <v-card-text>
        <v-row>
          <v-card class="col-4">
            <v-card-title> #{{ proposalId }} </v-card-title>
            <v-card-text>
              <v-img
                class="mb-6 rounded-tl-xl rounded-br-xl"
                :aspect-ratio="16 / 9"
                height="160"
                src="https://img.blogdoanderson.com/2019/04/WhatsApp-Image-2019-04-10-at-09.56.00.jpg"
              ></v-img>
              <p class="detail">
                <strong> Marca: </strong>
                {{ bike.brand }}
              </p>
              <p class="detail">
                <strong> Modelo: </strong>
                {{ bike.model }}
              </p>
              <p class="detail">
                <strong> Preço: </strong>
                R$ {{ formatPrice(Number(bike.price)) }}
                <InfoDialog text="Valor final pago pelo seguro">
                  <v-icon size="13">mdi-information</v-icon>
                </InfoDialog>
              </p>
              <p class="detail">
                <strong> Preço de Renovação: </strong>
                R$ {{ formatPrice(Number(bike.price) / 2) }}
                <InfoDialog text="Valor considerado da bike para renovação">
                  <v-icon size="13">mdi-information</v-icon>
                </InfoDialog>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-row class="justify-space-between">
                <v-col>
                  <v-btn text color="primary" @click="1"> Renovar </v-btn>
                </v-col>
                <v-col>
                  <v-btn text color="primary" @click="1"> Visualizar </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-row>
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
import { IAssociateBike } from "@/types/proposal";
import { CertificateService } from "@/api/certificate";
import { formatPrice } from "@/utils/utils";

type CallFunctionLoading = (loading: boolean) => void;

const certificateService = new CertificateService();

@Component({
  components: {
    InfoDialog,
  },
})
export default class CertificatesView extends Vue {
  formatPrice = formatPrice;
  proposalId = 0;
  bike: IAssociateBike = {
    id: -1,
    brand: "Carregando",
    category: "Carregando",
    model: "Carregando",
    price: 0,
  };

  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;

  async getCertificate() {
    this.changeLoading(true);
    const response = await certificateService.getCertificate();
    this.proposalId = response[0].id;
    this.bike = response[0].associate_bikes[0];
    this.changeLoading(false);
  }

  created() {
    this.getCertificate();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.detail {
  height: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.detail strong {
  margin-right: 5px;
}
h5 {
  color: #444;
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
}
@media (min-width: 1300px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
<style lang="scss">
.v-btn--fab.v-size--small {
  height: 25px !important;
  width: 25px !important;
}
</style>
