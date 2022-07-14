<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"><h5>Meus Certificados</h5></v-col>
      </v-row>
      <v-card-text>
        <v-row justify="center">
          <template v-for="(certificate, i) in certificates">
            <v-card
              class="col-md-4 col-11 mx-15 my-5"
              :key="`certificate-${i}`"
            >
              <v-card-title> #{{ certificate.id }} </v-card-title>
              <v-card-text>
                <v-img
                  class="mb-6 rounded-tl-xl rounded-br-xl"
                  :aspect-ratio="16 / 9"
                  height="160"
                  :src="certificate.proposal_images[0]"
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
                  <strong> Preço de Renovação: </strong>
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
  proposal_images: [""];
  id: number;
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
