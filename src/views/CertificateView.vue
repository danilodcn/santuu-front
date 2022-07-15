<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"
          ><h3 class="title-content">Meus Certificados</h3></v-col
        >
      </v-row>
      <v-card-text>
        <v-row class="justify-center justify-md-start">
          <template v-for="(certificate, i) in certificates">
            <v-card
              class="col-md-4 col-11 mx-0 mx-md-15 my-5"
              :key="`certificate-${i}`"
            >
              <v-card-title>
                #{{ certificate.id }}
                <v-btn
                  class="view-button rounded-0 rounded-br-xl elevation-0"
                  text
                  color="primary"
                  @click="
                    $router.push({
                      path: `/simulation/proposal-values/${certificate.id}`,
                    })
                  "
                >
                  Visualizar
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-img
                  class="mb-6 rounded-tl-xl rounded-br-xl"
                  :aspect-ratio="16 / 9"
                  height="160"
                  :src="certificate.proposal_images[0].file"
                ></v-img>
                <p class="detail">
                  <strong> Marca: </strong>
                  {{ certificate.associate_bikes[0].brand }}
                </p>
                <p class="detail">
                  <strong> Modelo: </strong>
                  {{ certificate.associate_bikes[0].model }}
                </p>
                <p class="detail">
                  <strong> Preço: </strong>
                  R$
                  {{
                    formatPrice(Number(certificate.associate_bikes[0].price))
                  }}
                  <InfoDialog text="Valor final pago pelo seguro">
                    <v-icon size="13">mdi-information</v-icon>
                  </InfoDialog>
                </p>
                <p class="detail">
                  <strong class="renewal-price"> Preço de Renovação: </strong>
                  R$
                  {{
                    formatPrice(
                      Number(certificate.associate_bikes[0].price) / 2
                    )
                  }}
                  <InfoDialog text="Valor considerado da bike para renovação">
                    <v-icon size="13">mdi-information</v-icon>
                  </InfoDialog>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="canRenewal(certificate.proposal_duration)"
                  class="renewal-button rounded-tl-lg rounded-br-lg"
                  elevation="0"
                  @click="1"
                >
                  Renovar
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
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
import { formatPrice, orderImage } from "@/utils/utils";

type CallFunctionLoading = (loading: boolean) => void;

const certificateService = new CertificateService();

interface ICertificate {
  proposal_images: {
    file: string;
    identifier: number;
  }[];
  id: number;
  proposal_duration: string;
  associate_bikes: IAssociateBike[];
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class CertificatesView extends Vue {
  formatPrice = formatPrice;
  orderImage = orderImage;

  certificates: ICertificate[] = [];
  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;

  async getCertificate() {
    this.changeLoading(true);
    const response = await certificateService.getCertificate();
    this.certificates = response;
    this.certificates?.map((certificate: any) => {
      this.orderImage(certificate.proposal_images);
    });
    console.log(this.certificates[0].proposal_images);
    this.changeLoading(false);
  }

  getDaysRemaining(date: string) {
    return (
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );
  }

  canRenewal(date: string) {
    return Math.abs(this.getDaysRemaining(date)) < 500;
  }

  created() {
    this.getCertificate();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.renewal-price {
  font-size: 12px;
}
.renewal-button {
  width: 100%;
  background-color: $main-color !important;
  color: white;
  border-radius: 0px;
}
.view-button {
  margin-left: auto;
  margin-right: 0px;
}
.title-content {
  font-weight: 500;
  color: $main-dark-color;
  margin: 0px auto 0px 12px;
}
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
  .title-content {
    margin: 0px auto 0px 55px;
  }
  .renewal-price {
    font-size: 14px;
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
