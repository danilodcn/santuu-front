<template>
  <v-card>
    <v-card
      elevation="0"
      :disabled="!data.operating"
      v-if="data.active"
      @click="handleLaneClick(data)"
    >
      <div @click="toForm(data)">
        <v-responsive :aspect-ratio="16 / 9">
          <v-img
            class="img"
            :src="data.url_card"
            :alt="`imagem da ciclovia ${data.lane_name}`"
          ></v-img>
        </v-responsive>
      </div>
      <v-card-title>
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="10" class="name ma-0 pa-0">
              <span
                class="text-body-2 break mx-auto"
                v-text="data.lane_name"
              /><br />
              <span class="caption break mx-auto" v-text="data.description" />
            </v-col>
            <v-col
              cols="2"
              class="ma-0 pa-0 text-center icon-active"
              v-if="data.operating"
            >
              <v-icon color="primary" size="16">mdi-check-circle</v-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-card-title>
      <v-divider />
      <v-row class="ma-0 pa-0" align="center">
        <v-col cols="10" class="pl-4 link">
          <a @click="showOperationTime(data.lane_name)"
            >Horários de funcionamento</a
          >
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/utils/component";

interface IOperationTime {
  id: number;
  first_hour: string;
  second_hour: string;
  day: number;
  bike_lane: number;
}
interface ICardData {
  id?: number;
  lane_name: string;
  description: string;
  operating: boolean;
  operation_time: IOperationTime[];
  active: boolean;
  state: string;
  city: string;
  url_map_location: string;
  hours: any;
  url_card?: string;
}

@Component
export default class LaneCard extends BaseComponent {
  @Prop() data!: ICardData;

  days_name = [
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
    "Domingo",
  ];
  handleLaneClick(lane: ICardData) {
    if (!lane.operating) {
      this.showOperationTime(lane.lane_name);
    }
  }
  showOperationTime(lane_name: string) {
    let msg = `
      Horários de funcinamento da ${lane_name}:
      <br><br>
      <table>
    `;
    for (let i = 0; i < 7; i++) {
      const operation_time = [
        ...this.data.operation_time
          .filter((x) => x.day == i)
          .sort((a, b) => {
            return a.first_hour > b.first_hour ? 1 : -1;
          }),
      ];

      let hour: any;
      if (operation_time.length > 0) {
        hour = [];
        operation_time.forEach((x) => {
          hour.push(x.first_hour.slice(0, 5) + "-" + x.second_hour.slice(0, 5));
        });
        hour = hour.join(" e ");
      } else {
        hour = "Fechado";
      }
      msg += `<tr>
        <td><strong>${this.days_name[i]}</strong></td> <td style='padding-left:30px'>${hour}</td>
      </tr>`;
    }
    msg += "</table>";

    this.changeMainDialog({
      active: true,
      bntClose: true,
      msg: msg,
      persistent: false,
      title: "",
      ident: false,
    });
  }

  toForm(lane: ICardData) {
    if (lane.operating) {
      this.$router.push({
        path: "/sos/form/?lane_id=" + (lane.id || -1).toString(),
      });
    }
  }
}
</script>

<style scoped>
.icon-active {
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
.img {
  width: 100%;
  height: 100%;
}
.link {
  text-decoration: underline !important;
}
.v-card--disabled {
  pointer-events: all;
}
</style>
