<template>
  <v-container class="content-container mt-10 mt-md-3 px-10 align-center">
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="backButton()">
        <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">
        SOS Bike
      </v-toolbar-title>
    </v-toolbar>
    <div class="call pt-10">
      <v-row>
        <template>
          <v-card class="mx-auto mb-3" max-width="300" @click="nextStep()">
            <v-img :src="image" contain height="200px"></v-img>
            <v-card-text> Criar chamado </v-card-text>
          </v-card>
          <v-card class="mx-auto mt-3" max-width="300" @click="openListCalls()">
            <v-img
              contain
              src="https://static.vecteezy.com/ti/vetor-gratis/p1/582034-ilustracao-em-icone-calendario-gratis-vetor.jpg"
              height="200px"
            ></v-img>
            <v-card-text> Histórico de chamados </v-card-text>
          </v-card>
        </template>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SosCard from "@/components/shared/sos/SosCard.vue";
import { sosService } from "@/api/sos";
import { IOrder, ISosCallForm } from "@/types/sos";
import { userDataService } from "@/api/userData";

@Component({
  components: { SosCard },
})
export default class Available extends Vue {
  is_mechanic = false;
  profile = {} as any;
  image =
    "https://cdn.icon-icons.com/icons2/2645/PNG/512/exclamation_icon_160163.png";

  async getProfile() {
    const response = await userDataService.getUserProfile();
    if (!response.error) {
      this.profile = response;
    } else {
      return;
    }
  }
  async check_mechanic() {
    await this.getProfile();
    console.log(this.profile.personal_info?.user);
    let response = await sosService.checkMechanic(
      this.profile.personal_info?.user
    );
    this.is_mechanic = response.is_mechanic;
    console.log(this.is_mechanic);
    if (this.is_mechanic) {
      this.image =
        "https://img.freepik.com/icones-gratis/configuracoes-engrenagem-simbolo_318-10116.jpg";
    }
  }

  nextStep() {
    if (this.is_mechanic == false) {
      this.$router.push({ path: "/sos/choose-lane" });
    } else {
      this.$router.push({ path: "/sos/active-call" });
    }
  }

  openListCalls() {
    this.$router.push({ path: "/sos/list-call" });
  }

  backButton() {
    this.$router.push({ path: "/sos/" });
  }

  created() {
    this.check_mechanic();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.call {
  min-height: 400px;
}
.button {
  color: $main-dark-color !important;
}
.no-list {
  font-weight: 200;
  color: $main-dark-color;
  margin: 40px auto 0px 40px;
}
.title-content {
  font-weight: 500 !important;
  color: $main-dark-color;
  margin: 5px auto 30px 10px;
}
@media (min-width: 960px) {
  .title-content {
    font-size: 1.5em;
  }
}
</style>
