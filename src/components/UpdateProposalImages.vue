<template>
  <v-row class="mt-5 justify-start mb-14" v-if="isMobile">
    <template v-for="item in missingImages">
      <v-col
        cols="8"
        md="3"
        class="image-card mx-4 .rounded-lg"
        :ref="`image-card-${item.image_type}`"
        @click="openInput(item.image_type)"
        :key="item.image_type"
      >
        <v-card>
          <v-system-bar color="primary" class="image-bar text-center">
            <p class="images-title ma-0 py-10">
              {{
                getImageConfig(item.image_type).showName ||
                getImageConfig(item.image_type).typeName
              }}
            </p>
          </v-system-bar>
          <v-row>
            <v-progress-circular
              class="mt-10 mb-6 col-12"
              :rotate="360"
              :size="50"
              :width="10"
              :value="10"
              color="primary"
              :ref="`loading-image-${item.image_type}`"
              v-show="false"
            ></v-progress-circular>
          </v-row>
          <v-img
            class="mt-12 mb-0 image"
            contain
            :src="`http://127.0.0.1:8000/static/assets/prev-images/prev-${
              getImageConfig(item.image_type).srcImageName
            }.svg`"
            :ref="`image-preview-${item.image_type}`"
            width="100"
          ></v-img>
          <v-card-actions class="justify-center">
            <v-btn text color="primary" class="text-caption text-md-body-2">
              Tirar foto
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-form v-show="false" :ref="`formImage-${item.image_type}`">
          <input
            type="file"
            v-show="false"
            name="file"
            :ref="`image-${item.image_type}`"
            accept="image/*"
            capture="environment"
            @change="updateImage(item.image_type)"
          />
          <input
            type="hidden"
            name="identifier"
            :value="`${item.image_type}`"
          />
          <input
            type="hidden"
            name="insurance_proposal"
            :value="`${proposal_id}`"
          />
        </v-form>
      </v-col>
    </template>
  </v-row>
  <v-row
    class="mt-5 justify-start mb-14 mx-0"
    v-else-if="missingImages.length > 0"
  >
    <div class="text-center col-12">
      <v-icon class="icon mb-3" size="35">mdi-cellphone-screenshot</v-icon>
      <p class="text-subtitle-1 font-weight-bold">
        Para tirar as fotos, por favor, acesse nossa plataforma WEB <br />
        (<a class="font-weight-medium" href="https://www.clubesantuu.com.br/web"
          >www.clubesantuu.com.br/web</a
        >) pelo CELULAR.
      </p>
      <div class="content-send">
        <p class="desc-comunicate">
          Para continuar com sua proposta, <br />
          basta fazer o login e <br />
          clicar no botão Propostas em Andamento.
        </p>
      </div>
      <div class="content-send">
        <p class="desc-comunicate">
          Não aceitamos Upload de imagens antigas por questões de segurança.
        </p>
      </div>
      <br />
      <a href="/web" class="btn"
        ><v-icon class="icon" size="40">mdi-checkbox-marked</v-icon></a
      >
    </div>
  </v-row>
</template>
<script lang="ts">
import { BaseComponent } from "@/utils/component";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ProposalImagesService } from "@/api/proposalImages";
import { imagesConfig } from "@/utils/utils";

const proposalImagesService = new ProposalImagesService();

interface IProgramImage {
  id: number;
  image_type_name: string;
  image_type: number;
  is_seller_upload: boolean;
  is_associate_upload: boolean;
  is_new_bike: boolean;
  is_used_bike: boolean;
  program: number;
}

@Component({
  components: {
    InfoDialog,
  },
})
export default class UpdateProposalImages extends BaseComponent {
  navigatorData = navigator as any;
  isMobile = this.navigatorData.userAgentData.mobile;
  @Prop() proposal_id?: number;
  missingImages = [] as IProgramImage[];
  imagesConfig = imagesConfig;

  getImageConfig(identifier: number) {
    const imageConfig = imagesConfig.find(
      (element) => element.identifier == identifier
    );
    return imageConfig;
  }

  openInput(identifier: number) {
    const element = (
      this.$refs[`image-${identifier}`] as HTMLInputElement[]
    )[0];
    if (element) {
      element.click();
    }
  }

  updateImage(identifier: number) {
    const imagePreviewElement = (
      this.$refs[`image-preview-${identifier}`] as HTMLImageElement[]
    )[0];
    const loadingImageElement = (
      this.$refs[`loading-image-${identifier}`] as Vue[]
    )[0];
    const imageInput = (
      this.$refs[`image-${identifier}`] as HTMLInputElement[]
    )[0];
    const imagePreviewElementVue = (
      this.$refs[`image-preview-${identifier}`] as Vue[]
    )[0];

    const file = imageInput.files?.item(0);
    const reader = new FileReader();

    if (file) {
      const date = new Date();

      const lastModified = file.lastModified;
      const timeDelta = date.getTime() - lastModified;
      const timeDeltaInMinutes = timeDelta / 1000 / 60;

      if (timeDeltaInMinutes > 20) {
        imageInput.files = null;
        this.changeMainDialog({
          msg: "Você precisa tirar foto e não fazer upload",
          title: "Atenção",
          persistent: false,
          active: true,
          bntClose: true,
        });
        return false;
      } else {
        reader.readAsDataURL(file);
      }
    } else {
      (loadingImageElement as any).value = `${0}`;
    }

    (imagePreviewElementVue.$el as HTMLImageElement).style.width = "100%";
    (imagePreviewElementVue.$el as HTMLImageElement).style.display = "none";
    (loadingImageElement.$el as HTMLDivElement).style.display = "block";

    (imagePreviewElementVue as any).contain = false;
    (imagePreviewElementVue as any).aspectRatio = 1;

    reader.onload = function (e) {
      (imagePreviewElementVue.$el as HTMLImageElement).style.display = "block";
      (loadingImageElement.$el as HTMLDivElement).style.display = "none";
      imagePreviewElement.src = e.target?.result as string;
    };
    reader.onprogress = function (data) {
      const progress = Math.ceil((data.loaded / data.total) * 100);
      (loadingImageElement as any).value = `${progress}`;
    };
  }

  sendAllImages() {
    let isValid = true;
    [...Array(13).keys()].forEach((element) => {
      if (this.$refs[`formImage-${element}`] as Vue[]) {
        if (
          !(
            (this.$refs[`formImage-${element}`] as Vue[])[0].$el
              .firstChild as HTMLInputElement
          ).files?.length
        ) {
          isValid = false;

          (
            this.$refs[`image-card-${element}`] as HTMLDivElement[]
          )[0].style.border = "1px solid red";
        } else {
          (
            this.$refs[`image-card-${element}`] as HTMLDivElement[]
          )[0].style.border = "none";
        }
      }
    });

    if (!isValid) {
      this.changeMainDialog({
        msg: "Você precisa preencher todas as imagens",
        title: "Atenção",
        persistent: false,
        active: true,
        bntClose: true,
      });
      return false;
    }
    let success = true;

    [...Array(13).keys()].forEach((element) => {
      if (this.$refs[`formImage-${element}`] as Vue[]) {
        if (
          (
            (this.$refs[`formImage-${element}`] as Vue[])[0].$el
              .firstChild as HTMLInputElement
          ).files?.length
        ) {
          if (
            !this.sendImage(
              (this.$refs[`formImage-${element}`] as Vue[])[0]
                .$el as HTMLFormElement
            )
          ) {
            success = false;
          }
        }
      }
    });

    return success;
  }

  async sendImage(formImage: HTMLFormElement) {
    this.changeLoading(true);
    const response = await proposalImagesService.proposalImages(formImage);
    this.changeLoading(false);
    if (response.error) {
      this.fail(response);
      return false;
    }
    return true;
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível realizar esta ação",
      title: "Erro",
      persistent: false,
      active: true,
      bntClose: true,
    });
  }

  async getMissingImages() {
    if (this.proposal_id) {
      const response = await proposalImagesService.getMissingImages(
        this.proposal_id
      );
      this.missingImages = response as IProgramImage[];
    }
  }

  created() {
    this.getMissingImages();
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/main.scss";
.btn {
  text-decoration: none;
}
.icon {
  color: $main-color;
}
.image-card {
  cursor: pointer;
}
.image-bar {
  line-height: 18px;
  height: 40px !important;
}
.image {
  margin: auto;
  width: 80px;
  border-radius: 5px;
}
.images-title {
  color: #fff;
  width: 100%;
  font-size: 0.9em;
}
@media (min-width: 1160px) {
  .image-bar {
    line-height: 20px;
  }
  .images-title {
    font-size: 1em;
  }
  .image {
    width: 120px;
  }
}
</style>
