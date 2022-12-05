<template>
  <v-row class="content">
    <v-textarea
      background-color="grey lighten-3"
      class="col-11 message"
      hint="Digite sua mensagem"
      rows="3"
      v-model="msg"
    ></v-textarea>
    <div class="col-1 btn-send d-flex align-content-center">
      <v-icon @click="sendMessage(msg)" color="white" dense>
        mdi-chevron-right
      </v-icon>
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
.btn-send {
  transform: translateX(-2em);
  padding-left: 0px !important;
}
.btn-send > button {
  background: #cccb00;
  border-radius: 10px;
  height: 34px !important;
  margin-top: 13px !important;
}
</style>
