<template>
  <v-form>
    <v-container class="content-container mt-10 mt-md-3 px-10">
      <v-row>
        <v-col cols="3" md="1">
          <v-icon large @click.prevent=""> mdi-chevron-left </v-icon>
        </v-col>
        <v-col cols="9" md="3">
          <h4 class="title-content">Chamado em andamento</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 12 : 2">
              <v-img
                lazy-src="https://i.insider.com/583ae70bba6eb620008b64cc?width=1200&format=jpeg"
                max-height="150"
                max-width="352.53"
                src="https://i.insider.com/583ae70bba6eb620008b64cc?width=1200&format=jpeg"
              ></v-img>
              <v-card-text class="mx-0">
                Rua Tiradentes, número 1, Centro
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col col="12" md="4">
          <v-card class="mx-auto" max-width="400" tile>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Mecânico:</v-list-item-subtitle>
                <v-list-item-title>Joarke de Sousa</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Marca da bike:</v-list-item-subtitle>
                <v-list-item-title>Caloi</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Modelo da bike:</v-list-item-subtitle>
                <v-list-item-title>MTB</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Tipo de serviço:</v-list-item-subtitle>
                <v-list-item-title>Ajuste do pedivela</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Obs.:</v-list-item-subtitle>
                <v-list-item-title>Pedivela está torto</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="3">
          <v-btn color="success" align="right" @click.stop="dialog = true">
            <div v-if="callStatus === 'caminho'">Cheguei no local</div>
            <div v-if="callStatus === 'finalizando'">Finalizar</div>
          </v-btn>
        </v-col>
        <v-col cols="6" md="1" class="align-md-content-end">
          <v-btn color="primary"> Chat </v-btn>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-text class="text-h5">
                <div v-if="callStatus === 'caminho'">
                  Você confirma que chegou no local?
                </div>
                <div v-else-if="callStatus === 'finalizando'">
                  Você confirma que finalizou o chamado?
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="red darken-1"
                  text
                  @click="confirmPosition(false)"
                >
                  Não
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="confirmPosition(true)"
                >
                  Sim
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { IEvent } from "@/types/events";

@Component({
  components: { EventCard },
})
export default class Available extends Vue {
  bike_model = "MTB";
  bike_brand = "Caloi";
  cpf = "000.000.000-00";
  reference_point = "Perto da Igreja";
  service_type = "Coserto da manivela";
  observation = "Manivela quebrou";
  dialog = false;
  callStatus = "caminho";

  confirmPosition(confirm: boolean) {
    if (confirm == true) {
      this.dialog = false;
      this.callStatus = "finalizando";
    } else {
      this.dialog = false;
    }
  }

  async sendFormData() {
    return null;
  }

  created() {
    this.sendFormData();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

@media (min-width: 960px) {
  .title-content {
    font-size: 1.3em;
    font-weight: 500 !important;
    color: $main-dark-color;
    margin: 5px auto 0px 10px;
  }
}
</style>
