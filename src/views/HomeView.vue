<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <v-btn @click="myfunc()" icon>
      <v-icon>mdi-facebook</v-icon>
      click
    </v-btn>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p>{{ a }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  a = "minha";
  myfunc() {
    this.a = "isso";
  }
}
</script>
