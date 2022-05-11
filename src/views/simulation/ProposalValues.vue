<template>
  <div class="proposal-values">
    <BoxContent>asdasd</BoxContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoxContent from "@/components/BoxContent.vue"; // @ is an alias to /src

@Component({
  components: {
    BoxContent,
  },
})
@Component
export default class HomeView extends Vue {}
</script>
