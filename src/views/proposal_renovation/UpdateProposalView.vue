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
              @click="updateData = true"
              v-if="step == 1"
              >Editar</v-btn
            >
            <small>Mantenha os dados antigos ou atualize-os</small>
          </v-stepper-step>

          <v-stepper-content step="1" class="mb-4">
            <update-data
              ref="updateData"
              :userId="userId"
              :update="updateData"
            ></update-data>
            <v-row justify="space-between" class="ma-0 mt-7">
              <v-btn text class="mx-2 mx-md-5"> Voltar </v-btn>
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
              @click="updateAddress = true"
              v-if="step == 2"
              >Editar</v-btn
            >
            <small>Mantenha o endereço antigo ou atualize-o</small>
          </v-stepper-step>

          <v-stepper-content step="2" class="mb-4">
            <update-address
              ref="updateAddress"
              :addressId="addressId"
              :update="updateAddress"
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
            v-show="missingImages.length > 0"
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
  updateData = false;
  updateAddress = false;
  proposalId = Number(this.$route.params.proposal_id);
  userId?: number;
  addressId?: number;
  missingImages = [] as IProgramImage[];

  step = 1;

  isValidCPF = isValidCPF;
  datePast = datePast;
  toDDMMYYYY = toDDMMYYYY;
  toYYYYMMDD = toYYYYMMDD;

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível continuar com sua renovação",
      title: "Erro",
      persistent: false,
      active: true,
      bntClose: true,
    });
    this.changeLoading(false);
  }

  async associateData() {
    const associated = await (this.$refs.updateData as any).associateData();
    if (associated) {
      this.step++;
    }
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
    if (this.proposalId) {
      const response = await proposalImagesService.getMissingImages(
        this.proposalId
      );
      this.missingImages = response;
      if (this.missingImages.length > 0) {
        this.step++;
      } else {
        this.next();
      }
    }
  }

  async sendAllImages() {
    const success = await (this.$refs.updateImages as any).sendAllImages();
    if (success) {
      this.next();
    }
  }

  async getData() {
    const proposal = await proposalService.getProposal(this.proposalId);
    this.userId = proposal.associate.id;
    if (this.userId) {
      const response = await userDataService.getUserData(this.userId);
      this.addressId = response[0].address.id;
    }
  }

  next() {
    this.$router.push({ path: `/proposal/payment/${this.proposalId}` });
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
