<template>
  <v-container class="content-container">
    <h4 class="title-content">{{ bike_event.name }}</h4>
    <v-card class="px-0 px-md-5 py-10 mt-5">
      <v-row class="justify-start justify-md-center event-content">
        <v-col class="col-12 pb-0">
          <img class="col-12 py-0" :src="bike_event.poster" />
          <v-card-title class="pt-0">
            <v-col class="col-12 mb-0 mb-md-15 py-0 share">
              <span>Compartilhe:</span>
              <twitter-button
                class="pa-0 share-button--circle share-button--outline"
                btnText
                :description="`Vamos para o ${bike_event.name}`"
              />
              <whats-app-button
                class="pa-0 share-button--circle share-button--outline"
                btnText
                :description="`Vamos para o ${bike_event.name}`"
              />
              <facebook-button
                class="pa-0 share-button--circle share-button--outline"
                btnText
                :description="`Vamos para o ${bike_event.name}`"
              />
            </v-col>
          </v-card-title>
        </v-col>
        <v-col class="col-10 offset-1 pt-6">
          <h4>{{ bike_event.name }}</h4>
        </v-col>
        <v-col class="col-10 offset-1 py-0">
          <p>{{ bike_event.description }}</p>
        </v-col>
        <v-col class="col-10 offset-1 pt-8 pt-md-14">
          <h4>Horário</h4>
        </v-col>
        <v-col class="col-10 offset-1 py-0">
          <p>
            O evento acontecerá do dia {{ bike_event.initial_date }} até o dia
            {{ bike_event.final_date }}
          </p>
        </v-col>
        <v-col class="col-10 offset-1 pt-8 pt-md-14">
          <h4>Local</h4>
        </v-col>
        <v-col class="col-10 offset-1 py-0 mb-15">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1103.0684548715617!2d-46.699403890676784!3d-23.623116899999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50c4a726aaab%3A0xa6b37701be082ac8!2sMorumbi%20Shopping!5e1!3m2!1spt-PT!2sbr!4v1655823110625!5m2!1spt-PT!2sbr"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </v-col>
        <!-- <v-col cols="6" class="pl-15">
          <a href="{% url 'bike_event_available_view' pk=bike_event.id %}">
              <img class="event_image" :src="bike_event.poster" />
          </a>
        </v-col> -->
      </v-row>
      <v-divider class="mt-15"></v-divider>
      <meta property="og:image" :content="bike_event.poster" />
      <v-card-actions class="back-forward">
        <v-row justify="end" class="mx-5">
          <v-btn text class="button">Quero me inscrever</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import TwitterButton from "vue-share-buttons/src/components/TwitterButton.vue";
import WhatsAppButton from "vue-share-buttons/src/components/WhatsAppButton.vue";
import FacebookButton from "vue-share-buttons/src/components/FacebookButton.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import { Component, Vue } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import { Mutation } from "vuex-class";
import { IDialog, MutationTypes } from "@/store";
import { EventsService } from "@/api/bikeEvents";
import { formatDateToBar, setSocialProperties } from "@/utils/utils";

type CallFunctionLoading = (loading: boolean) => void;
type CallFunctionDialog = (payload: IDialog) => void;

const eventsService = new EventsService();

@Component({
  components: {
    InfoDialog,
    TwitterButton,
    WhatsAppButton,
    FacebookButton,
  },
})
export default class Available extends Vue {
  bike_event = {
    name: "Carregando...",
    initial_date: "Carregando...",
    final_date: "Carregando...",
    poster: "Carregando...",
    description: "Carregando...",
  };

  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainDialog!: CallFunctionDialog;

  async getEvents(bike_event = "") {
    this.changeLoading(true);
    let response = await eventsService.getEvent({
      id: bike_event,
      type: "going",
    });
    console.log(response);

    response[0].initial_date = formatDateToBar(response[0].initial_date);
    response[0].final_date = formatDateToBar(response[0].final_date);
    this.bike_event = response[0];

    setSocialProperties(
      window.location.href,
      this.bike_event.name,
      this.bike_event.description,
      this.bike_event.poster
    );

    this.changeLoading(false);
  }

  formatDate(grossDate: string) {
    const date = new Date(grossDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formatted = `${day}/${month}/${year}`;

    return formatted;
  }

  created() {
    this.getEvents("5");
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.share-button::v-deep svg {
  width: 10px;
  height: 10px;
  transform: translateY(-7px) !important;
}
.share-button::v-deep {
  margin-top: 6px;
  min-width: 22px;
  min-height: 22px;
  height: 22px;
}
.share span {
  margin-left: 0px;
  margin-right: 10px;
  font-size: 0.7em;
}
img {
  width: 100%;
}
p {
  color: $main-dark-color;
  margin: 0px;
  font-size: 0.9em;
}
.container {
  margin: auto;
}
h3 {
  color: $main-dark-color;
}
.title-content {
  font-weight: 500;
  color: $main-dark-color;
  margin: 10px auto 10px 10px;
}
.event_image {
  transform: translate(-20px, -20px);
  max-width: 200px;
  padding: 10px;
  margin-top: auto;
}
.back-forward {
  margin-top: 30px;
}
.more {
  text-transform: none;
}
.button,
.more {
  color: $main-dark-color !important;
}
.v-icon {
  color: $main-dark-color !important;
}
.v-card {
  margin: auto;
  margin-bottom: 30px;
  max-width: 1080px;
}
iframe {
  margin-left: -6px;
}
@media (min-width: 960px) {
  .title-content {
    font-weight: 800;
    font-size: 1.5em;
  }
  iframe {
    width: 500px;
    height: 300px;
  }
  .share {
    margin-top: 10px;
  }
  .share span {
    font-size: 1em;
  }
  .share-button::v-deep svg {
    width: 15px;
    height: 15px;
    transform: translateY(-2px) !important;
  }
  .share-button::v-deep {
    margin-top: -1px;
    min-width: 35px;
    min-height: 35px;
  }
}
</style>
