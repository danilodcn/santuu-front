<template>
  <v-app id="app" light>
    <v-row>
      <div id="fake-menu"></div>
      <nav id="dev-nav">
        <router-link to="/simulation/bike-info">BikeInfo</router-link> |
        <router-link to="/bike-events/">Eventos</router-link> |
        <router-link to="/bike-events/checkin">Checkin</router-link> |
        <router-link to="/simulation/proposal-values">
          Proposal Values
        </router-link>
        |
        <router-link to="/raffle">Sorteador</router-link>
      </nav>
      <div id="content-main" class="col">
        <loading-main></loading-main>
        <main-dialog />
        <router-view />
      </div>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainDialog from "@/components/MainDialog.vue";
import LoadingMain from "./components/LoadingMain.vue";

@Component({
  components: {
    MainDialog,
    LoadingMain,
  },
})
export default class HelloWorld extends Vue {
  dialog = false;
}
</script>

<style lang="scss">
@import "@/scss/main.scss";
#content-main {
  padding-bottom: 0px;
  padding-top: 0px;
}
#fake-menu {
  display: none;
  background-color: red;
  width: 320px !important;
  height: 1000px;
}
* {
  font-family: $main-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  background-color: #f9f9fc !important;
}
#dev-nav {
  display: none;
  padding: 30px;
  text-align: center;

  width: 320px !important;
  height: 1000px;
  background-color: rgb(204, 166, 166);

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@media (max-width: 768px) {
  body {
    overflow-x: clip !important;
  }
}
</style>
