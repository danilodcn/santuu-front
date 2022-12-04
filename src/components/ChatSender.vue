<template>
  <v-row class="content">
    <v-textarea
      class="col-10 message"
      hint="Digite sua mensagem"
      rows="3"
      v-model="msg"
    ></v-textarea>
    <div class="col-2 d-flex align-content-center">
      <v-icon @click="sendMessage(msg)"> mdi-chevron-right </v-icon>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChatSender extends Vue {
  msg = "";

  sendMessage(msg: string) {
    alert(msg);
  }
}
</script>

<style scoped>
.content >>> .v-textarea textarea {
  font-size: 1em;
  line-height: 1.1em;
  overflow: hidden;
}
</style>
