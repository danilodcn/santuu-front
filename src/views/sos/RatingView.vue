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
    <div class="rating-date mt-10">
      <v-row justify="center">
        <template>
          <p>Chamado #{{ order_data.id }} finalizado em {{ date }}</p>
        </template>
      </v-row>
    </div>
    <div class="rating-avatar mt-10 mb-8">
      <v-row justify="center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="100" v-bind="attrs" v-on="on">
              <img :src="avatarUrl" />
            </v-avatar>
          </template>
        </v-menu>
      </v-row>
    </div>
    <v-row justify="center">
      <span>Mecânico: {{ order_data.mechanic_name }}</span>
    </v-row>
    <div class="rating-rating mt-6">
      <v-row justify="center">
        <v-rating
          background-color="grey lighten-2"
          color="warning"
          length="5"
          size="25"
          :value="rating_service"
          half-increments
        >
        </v-rating>
      </v-row>
    </div>
    <div class="rating-text mt-8">
      <v-row justify="center">
        <v-col class="col-sm-5 col-xs-5 col-md-6">
          <v-textarea
            v-model="rating_text"
            clearable
            rows="4"
            row-height="15"
            no-resize
            single-line
            :rules="[(v) => v.length <= 100 || 'Máximo 100 caracteres.']"
            counter="100"
            placeholder="Você pode comentar sua avaliação aqui"
          />
        </v-col>
      </v-row>
    </div>
    <div class="rating-buttons mt-6 mb-10">
      <v-row justify="center" class="mx-10">
        <v-btn
          color="#CCCB00"
          class="ma-0 pa-0 mx-3"
          text=""
          @click="backButton()"
          >Não avaliar</v-btn
        >
        <v-btn color="#CCCB00" class="white--text mx-3" @click="sendRating()"
          >Avaliar</v-btn
        >
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { formatDate } from "@/utils/utils";
import { sosService } from "@/api/sos";
import { BaseComponent } from "@/utils/component";

interface IRatingData {
  id: number;
  rating_service: string;
  mechanic_name: string;
  finish_date: string;
}

@Component
export default class Available extends BaseComponent {
  order_data = {} as IRatingData;
  is_mechanic = false;
  profile = {} as any;
  text = "";
  image = "";
  rating_text = "";
  rating_service = 5;
  avatarUrl = "https://cdn-icons-png.flaticon.com/512/2180/2180120.png";

  backButton() {
    this.$router.push({ path: "/sos/home/" });
  }

  get date(): string {
    return formatDate(this.order_data.finish_date);
  }

  async sendRating() {
    if (this.order_data.rating_service != null) {
      this.changeMainDialog({
        msg: `O chamado ${this.order_data.id} já foi avaliado!`,
        title: "Avaliação",
        persistent: true,
        active: true,
        bntClose: false,
        btnOkOnly: true,
        msgOk: "OK",
        ident: false,
      });
      return;
    } else {
      this.changeLoading(true);
      await sosService.sendRating({
        rating_service: this.rating_service,
        rating_text: this.rating_text,
      });
      this.changeLoading(false);
      this.backButton();
    }
  }

  async getUserLastOrder() {
    this.order_data = await sosService.getUserLastOrder();
    this.initDialog();
  }

  initDialog(): void {
    this.changeMainDialog({
      msg: `O chamado #${this.order_data.id} foi finalizado! agora você fazer a sua avaliação.`,
      title: "Chamado finalizado",
      persistent: true,
      active: true,
      bntClose: false,
      btnOkOnly: true,
      msgOk: "OK",
      ident: false,
    });
  }

  created() {
    this.changeLoading(true);
    this.getUserLastOrder();
    this.changeLoading(false);
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
