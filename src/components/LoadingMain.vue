<template>
  <div class="text-center">
    <v-overlay :value="loading">
      <div class="content">
        <v-progress-circular
          indeterminate
          size="80"
          class="ma-3"
        ></v-progress-circular>
        <!-- <span class="text-subtitle-1">carregando ...</span> -->
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  name: "MainLoading",
})
export default class HelloWorld extends Vue {
  @State("loading") loading!: boolean;
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>
