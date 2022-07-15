<template>
  <v-container fluid>
    <v-card class="box-content">
      <v-row class="title">
        <v-col cols="12"><h3 class="title-content">Associar dados</h3></v-col>
      </v-row>
      <v-card-text>
        <v-stepper v-model="e6" vertical class="mx-8 elevation-0">
          <v-stepper-step :complete="e6 > 1" step="1">
            Associar dados
            <small>Mantenha os dados antigos ou atualize-os</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card color="grey lighten-1" class="mb-12" height="200px">
              cpf, primeiro nome, sobrenome, e-mail, confirmação de e-mail,
              telefone, rg, data de nascimento, pessoa exposta politicamente?
            </v-card>
            <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Associar endereço
            <small>Mantenha o endereço antigo ou atualize-o</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height="200px">
              cep, estado, cidade, bairro, rua, número, complemento
            </v-card>
            <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Você deve enviar as seguintes fotos para continuar com a renovação
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
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

@Component({
  components: {
    InfoDialog,
  },
})
export default class CertificatesView extends Vue {
  e6 = 1;
  created() {
    return 1;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
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
