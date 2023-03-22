<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"><h3 class="title-content">Associar dados</h3></v-col>
      </v-row>
      <v-card-text class="pl-0">
        <v-stepper v-model="step" vertical class="mx-0 mx-md-8 elevation-0">
          <v-stepper-step :complete="step > 1" step="1">
            Associar dados
            <v-btn
              class="update-button"
              elevation="0"
              color="white"
              @click="canUpdateData = true"
              v-if="step == 1"
              >Editar</v-btn
            >
            <small>Mantenha os dados antigos ou atualize-os</small>
          </v-stepper-step>

          <v-stepper-content step="1" class="mb-4">
            <update-data
              ref="updateData"
              :userId="userId"
              :update="canUpdateData"
            ></update-data>
            <v-row justify="space-between" class="ma-0 mt-7">
              <v-btn text class="mx-2 mx-md-5" @click="back()"> Voltar </v-btn>
              <v-btn
                color="primary"
                class="mx-2 mx-md-5"
                @click="associateData()"
              >
                Avançar
              </v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Associar endereço
            <v-btn
              class="update-button"
              elevation="0"
              color="white"
              @click="canUpdateAddress = true"
              v-if="step == 2"
              >Editar</v-btn
            >
            <small>Mantenha o endereço antigo ou atualize-o</small>
          </v-stepper-step>

          <v-stepper-content step="2" class="mb-4">
            <update-address
              ref="updateAddress"
              :addressId="addressId"
              :update="canUpdateAddress"
            ></update-address>
            <v-row justify="space-between" class="ma-0 mt-7">
              <v-btn text class="mx-2 mx-md-5" @click="step--"> Voltar </v-btn>
              <v-btn
                color="primary"
                class="mx-2 mx-md-5"
                @click="associateAddress()"
              >
                Avançar
              </v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-step
            :complete="step > 3"
            step="3"
            v-if="missingImages && missingImages.length > 0"
          >
            Você deve enviar as seguintes fotos para continuar com a renovação
            <small>
              Abaixo as imagens que estão faltando na sua antiga proposta
            </small>
          </v-stepper-step>

          <v-stepper-content step="3">
            <update-proposal-images
              ref="updateImages"
              :proposal_id="$route.params.proposal_id"
            ></update-proposal-images>
            <v-row justify="space-between" class="ma-0 mt-7">
              <v-btn text class="mx-2 mx-md-5" @click="step--"> Voltar </v-btn>
              <v-btn
                color="primary"
                class="mx-2 mx-md-5"
                @click="sendAllImages()"
                :disabled="!mobile"
              >
                Avançar
              </v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import UpdateData from "@/components/UpdateData.vue";
import UpdateAddress from "@/components/UpdateAddress.vue";
import UpdateProposalImages from "@/components/UpdateProposalImages.vue";
import { isValidCPF, datePast, toDDMMYYYY, toYYYYMMDD } from "@/utils/utils";
import { BaseComponent } from "@/utils/component";
import { UserDataService } from "@/api/userData";
import { ProposalService } from "@/api/proposal";
import { ProposalImagesService } from "@/api/proposalImages";
import { IProgramImage } from "@/types/proposal";
import { RenewalService } from "@/api/renewal";

const renewalService = new RenewalService();
const proposalImagesService = new ProposalImagesService();
const userDataService = new UserDataService();
const proposalService = new ProposalService();

@Component({
  components: {
    InfoDialog,
    UpdateData,
    UpdateAddress,
    UpdateProposalImages,
  },
})
export default class UpdateProposal extends BaseComponent {
  canUpdateData = false;
  canUpdateAddress = false;
  proposalId = Number(this.$route.params.proposal_id);
  userId?: number;
  addressId?: number;
  missingImages = [] as IProgramImage[];
  mobile = false;
  step = 1;

  isValidCPF = isValidCPF;
  datePast = datePast;
  toDDMMYYYY = toDDMMYYYY;
  toYYYYMMDD = toYYYYMMDD;

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível continuar com sua renovação!",
      title: "Erro!",
      persistent: false,
      active: true,
      bntClose: true,
    });
    this.changeLoading(false);
  }

  isMobile() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  async associateData() {
    const associated = await (this.$refs.updateData as any).associateData();
    console.log(associated);
    if (associated) {
      this.step++;
    }
  }
  async mounted() {
    this.mobile = this.isMobile();
    const response = await proposalImagesService.getMissingImages(
      Number(this.$route.params.proposal_id)
    );
    this.missingImages = response;
  }

  async associateAddress() {
    const associated = await (
      this.$refs.updateAddress as any
    ).associateAddress();
    if (associated) {
      this.handleImages();
    }
  }

  async handleImages() {
    if (this.$route.params.proposal_id) {
      if (this.missingImages.length > 0) {
        this.step = 3;
      } else {
        this.nextPage(this.proposalId);
      }
    }
  }

  async sendAllImages() {
    const success = await (this.$refs.updateImages as any).sendAllImages();
    const proposal = await proposalService.getProposal(this.proposalId);

    const WAITING_FOR_CUSTOMER_ANALYSIS = 2;
    const WAITING_FOR_PAYMENT = 4;

    if (success) {
      if (proposal.status == WAITING_FOR_CUSTOMER_ANALYSIS) {
        this.changeMainDialog({
          msg: "Sua proposta será analisada pela nossa equipe!",
          title: "Aguarde!",
          persistent: true,
          active: true,
          bntClose: false,
          btnOkOnly: true,
          msgOk: "Ok!",
          afterFunction: this.toHomePage,
          ident: false,
        });
      } else if (proposal.status == WAITING_FOR_PAYMENT) {
        this.nextPage(this.proposalId);
      }
    }
  }

  toHomePage() {
    this.$router.push({ name: "certificates" });
  }

  async getData() {
    const proposal = await proposalService.getProposal(
      Number(this.$route.params.proposal_id)
    );
    this.userId = proposal.associate.id;
    if (this.userId) {
      const response = await userDataService.getUserData(this.userId);
      this.addressId = response[0].address.id;
    }
  }

  async nextPage(id: number | string) {
    this.changeLoading(true);
    const response = await renewalService.getNextStep(id);
    this.changeLoading(false);
    if (response.error) {
      this.changeMainDialog({
        msg: "Erro!",
        title: "Erro!",
        persistent: true,
        active: true,
        bntClose: true,
        ident: false,
      });
    } else {
      this.$router.push({ path: `/proposal/payment/${this.proposalId}` });
    }
  }
  back() {
    this.$router.push({
      path: `/renovation/proposal-values/${this.proposalId}`,
    });
  }
  created() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.update-button {
  margin-left: 10% !important;
  color: $main-dark-color;
}
.title-content {
  font-weight: 500;
  color: $main-dark-color;
  margin: 0px auto 0px 12px;
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
  .update-button {
    margin-left: 70% !important;
    color: $main-dark-color;
  }
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
}
@media (min-width: 1300px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}
</style>
