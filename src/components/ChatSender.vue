<template>
  <div class="content">
    <v-col cols="12">
      <v-textarea
        background-color="grey lighten-3"
        class="message"
        hint="Digite sua mensagem"
        rows="4"
        v-model="msg"
        append-icon="mdi-chevron-right"
        @click:append="sendMessage(msg)"
      ></v-textarea>
    </v-col>
  </div>
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
  resize: none;
  font-size: 1em;
  line-height: 1.1em;
  overflow: hidden;
}
.v-textarea {
  padding-right: 0px !important;
}
.content >>> .v-input__slot::before {
  border: none !important;
}
.content >>> .v-input__control {
  border-radius: 3px !important;
}
.content >>> .v-input__icon {
  background: #cccb00;
  border-radius: 15px;
  height: 44px !important;
  margin-top: 8px !important;
  margin-right: 10px !important;
}
.content >>> .v-input__icon button {
  color: white !important;
}
</style>
