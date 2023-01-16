<template>
  <v-container class="content-container mt-10 mt-md-3 px-10">
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="backButton()">
        <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">
        Ciclovias
      </v-toolbar-title>
    </v-toolbar>
    <v-row class="title-3 ml-8 mb-8"> Em qual ciclovia você está? </v-row>
    <div class="lanes">
      <v-row>
        <template v-for="(lane, i) in lanes">
          <v-col cols="12" sm="6" md="4" v-if="lane" :key="`lane-${i}`">
            <lane-card :data="lane" />
          </v-col>
        </template>
        <h4
          class="col-12 no-lanes text-center mt-10"
          v-if="!lanes.find((x) => x.active)"
        >
          Nenhuma ciclovia disponível
        </h4>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LaneCard from "@/components/shared/sos/LaneCard.vue";
import { BaseComponent } from "@/utils/component";
import { sosService } from "@/api/sos";
import { ILane } from "@/types/sos";

@Component({
  components: { LaneCard },
})
export default class Available extends BaseComponent {
  lanes: ILane[] = [];
  type = this.$route.query.type as string;
  is_mechanic = false;

  async check_mechanic() {
    this.changeLoading(true);
    let response = await sosService.checkMechanic();
    if(response.is_mechanic){
      this.$router.push({ path: "/sos/home/" })
    };
  }

  async getLanes() {
    this.changeLoading(true);
    let lanes = await sosService.getLanes();
    lanes = lanes.map((e: any) => {
      return {
        ...e,
      };
    });

    this.lanes = lanes;
    this.changeLoading(false);
  }

  backButton() {
    this.$router.push({ path: "/sos/home/" });
  }

  handle() {
    this.lanes = this.lanes.map((e) => {
      return { ...e };
    });
  }

  created() {
    this.getLanes();
    this.check_mechanic();
    // this.handle();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.lanes {
  min-height: 400px;
}
.button {
  color: $main-dark-color !important;
}
.no-lane {
  font-weight: 200;
  color: $main-dark-color;
  margin: 40px auto 0px 40px;
}
.title-content {
  font-weight: 500 !important;
  color: $main-dark-color;
  margin: 15px auto 30px auto;
}
.lane_image {
  padding: 10px;
  margin-top: auto;
}
.item-proposal {
  font-size: 0.8em;
}
@media (min-width: 960px) {
  .title-content {
    font-size: 1.5em;
  }
}
</style>
