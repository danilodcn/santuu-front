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
                  :to="`/renovation/summary-certificate/${certificate.id}/?has_new_coverage=false`"
                >
                  Visualizar
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-img
                  class="mb-6 rounded-tl-xl rounded-br-xl"
                  :aspect-ratio="16 / 9"
                  height="160"
                  :src="certificate.data.image"
                ></v-img>
                <p class="detail">
                  <strong> Marca: </strong>
                  {{ certificate.data.brand }}
                </p>
                <p class="detail">
                  <strong> Modelo: </strong>
                  {{ certificate.data.model }}
                </p>
                <p class="detail">
                  <strong> Preço da bike: </strong>
                  R$
                  {{ certificate.data.bike_price }}
                  <InfoDialog text="Valor da bike segurada">
                    <v-icon size="13">mdi-information</v-icon>
                  </InfoDialog>
                </p>
                <p class="detail">
                  <strong class="renewal-price"> Preço de Renovação: </strong>
                  R$
                  {{ certificate.data.bike_new_price }}
                  <InfoDialog text="Valor considerado da bike para renovação">
                    <v-icon size="13">mdi-information</v-icon>
                  </InfoDialog>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="canRenew(certificate.proposal_duration)"
                  class="renewal-button rounded-tl-lg rounded-br-lg"
                  elevation="0"
                  @click="renew(certificate.id)"
                >
                  <span v-if="!certificate.already_renewed"> Renovar </span>
                  <span v-else> Continuar renovação </span>
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
import { RenewalService } from "@/api/renewal";
import { formatPrice, orderImage } from "@/utils/utils";
import { IModel } from "@/types/bike";

type CallFunctionLoading = (loading: boolean) => void;
type CallFunctionDialog = (payload: IDialog) => void;

const renewalService = new RenewalService();
const certificateService = new CertificateService();

interface ICertificate {
  proposal_images: {
    file: string;
    identifier: number;
  }[];
  id: number;
  proposal_duration: string;
  associate_bikes: IAssociateBike[];
  data: ICertificateData;
  already_renewed: boolean;
  model: IModel;
  bike_new_price: string | number;
}

interface ICertificateData {
  image: string;
  brand: string;
  model: string;
  bike_price: string | number;
  bike_new_price: string | number;
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
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainDialog!: CallFunctionDialog;

  async getCertificate() {
    this.changeLoading(true);
    const response = await certificateService.getCertificate();
    this.changeLoading(false);
    if (response.error) {
      this.fail(response);
      return;
    }
    this.certificates = response;
    this.certificates?.map((certificate: any) => {
      this.orderImage(certificate.proposal_images);
    });
    this.buildCertificateData();
  }

  getDaysRemaining(date: string) {
    return (
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)
    );
  }

  canRenew(date: string) {
    const daysBeforeAlert = 30;
    const daysRemaining = this.getDaysRemaining(date);
    return (
      (daysRemaining < 0 && daysRemaining > -daysBeforeAlert) ||
      daysRemaining > 0
    );
  }

  async renew(id: number) {
    this.changeLoading(true);
    const response = await renewalService.renew(id);
    this.changeLoading(false);

    if (response.error) {
      var msg;
      if ("without_price" in response.axiosError.response.data) {
        msg =
          "Sua proposta está sem valor. Favor entrar em contato com <a  target='_blank' href='http://api.whatsapp.com/send?1=pt_BR&phone=5511934862272'>55 11 9 3486-2272</a> ou renovacao@clubesantuu.com.br";
      } else {
        msg =
          response.axiosError.response.data.error ||
          response.axiosError.response.data.detail;
      }
      this.changeMainDialog({
        msg: msg,
        title: "Erro!",
        persistent: true,
        active: true,
        btnOkOnly: true,
        msgOk: "ok",
        bntClose: true,
        ident: false,
      });
    } else {
      this.$router.push({
        path: `/renovation/proposal-values/${response.id}`,
        query: {
          has_new_coverage: response.has_new_coverage,
        },
      });
      return;
    }
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data.error ||
        response.axiosError.response.data.detail,
      title: "Erro!",
      persistent: true,
      active: true,
      bntClose: true,
      ident: false,
    });
  }

  buildCertificateData() {
    for (const item of this.certificates) {
      let bike_price = item.associate_bikes[0]?.price || "-";
      let bike_new_price =
        item.model == null ? item.bike_new_price || "-" : item.model.price;

      const data: ICertificateData = {
        image: item.proposal_images[0]?.file || "",
        brand: item.associate_bikes[0]?.brand || "",
        model: item.associate_bikes[0]?.model || "",
        bike_price:
          bike_price == "-" ? bike_price : formatPrice(Number(bike_price)),
        bike_new_price:
          bike_new_price == "-"
            ? bike_new_price
            : formatPrice(Number(bike_new_price)),
      };
      item.data = data;
    }
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
  background-color: $main-dark-color !important;
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
