<template>
  <v-app id="app" light>
    <!-- <nav id="dev-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/simulation/bike-info">BikeInfo</router-link> |
      <router-link to="/simulation/proposal-values">
        Proposal Values
      </router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>
    <main-dialog /> -->
    <LoadingMain></LoadingMain>
    <main-dialog />
    <router-view />
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
* {
  font-family: $main-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  background-color: #f9f9fc !important;
}
#dev-nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
