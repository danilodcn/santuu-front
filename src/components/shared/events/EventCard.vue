<template>
  <v-card>
    <v-card elevation="0">
      <v-responsive :aspect-ratio="16 / 9">
        <v-img
          class="poster"
          :src="data.url"
          :alt="`imagem do evento ${data.name}`"
        ></v-img>
      </v-responsive>
      <v-card-title>
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="10" class="name ma-0 pa-0">
              <span class="text-body-2 break mx-auto" v-text="data.name" />
            </v-col>
            <v-col
              cols="2"
              class="ma-0 pa-0 text-center icon-registered"
              v-if="data.registered"
            >
              <v-icon color="primary" size="16">mdi-check-circle</v-icon>
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="ma-0 pa-0" align="center">
            <v-col cols="2" align-self="center">
              <v-icon color="primary">mdi-calendar</v-icon>
            </v-col>
            <v-col>
              <span
                class="text--center break mx-auto text-body-2"
                v-text="date"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card-title>
    </v-card>
    <v-container fluid>
      <v-btn
        v-if="data.final_date > new Date().toISOString()"
        :to="'/bike-events/event?event_id=' + data.id.toString()"
        color="primary"
        width="100%"
        class="mb-1"
        >quero me inscrever</v-btn
      >
      <v-btn
        v-if="
          data.has_raffle &&
          new Date(data.final_date).getTime() > now_plus_3_days_ms
        "
        @click="handlePresenceConfirmation"
        color="primary"
        width="100%"
        class="mt-1"
        :disabled="disableButtonConfirmation"
        >quero participar do sorteio</v-btn
      >
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/utils/utils";
import { presenceConfirmationService } from "@/api/raffle/presenceConfirmation";
import { BaseComponent } from "@/utils/component";

interface ICardData {
  id: number;
  url: string;
  name: string;
  initial_date: string;
  final_date: string;
  has_raffle: boolean;
  hasActivePresenceConfirmation: boolean;
  local: string;
  registered: boolean;
}

@Component
export default class EventCard extends BaseComponent {
  @Prop() data!: ICardData;
  disableButtonConfirmation = false;
  now_ms = new Date().getTime();
  now_plus_3_days_ms = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;

  get date(): string {
    return formatDate(this.data.initial_date);
  }

  async handlePresenceConfirmation() {
    let message;
    let title;
    if (this.data.hasActivePresenceConfirmation) {
      this.changeLoading(true);
      const response = await presenceConfirmationService.subscription({
        eventID: this.data.id,
      });
      if (response.error) {
        message = response.axiosError?.response?.data?.message;
        title = "Erro!";
      } else {
        title = "Sucesso!";
        this.disableButtonConfirmation = true;
        message =
          "Você acaba de confirmar sua presença no evento! Aguarde o resultado do sorteio.";
      }
      this.changeLoading(false);
    } else {
      message = "Tente novamente mais tarde";
      title = "Sorteio ainda não liberado";
    }

    this.changeMainDialog({
      active: true,
      bntClose: true,
      msg: message,
      ident: false,
      persistent: false,
      title,
    });
  }
}
</script>

<style scoped>
.icon-registered {
  margin-top: -6px !important;
}
.name {
  line-height: 20px;
  overflow: hidden;
  height: 50px;
}
.break {
  min-width: none;
  word-break: break-word;
}
.poster {
  width: 100%;
  height: 100%;
}
</style>
