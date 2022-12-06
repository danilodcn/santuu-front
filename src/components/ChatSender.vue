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
        @keyup="slice255()"
      ></v-textarea>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrder } from "@/types/sos";
import { sosService } from "@/api/sos";

@Component
export default class ChatSender extends Vue {
  msg = "";
  @Prop() order_data!: IOrder;

  async sendMessage(msg: string) {
    const txt = this.msg;
    this.msg = "";
    const response = await sosService.sendMessages(txt, this.order_data.id);
  }
  slice255() {
    this.msg = this.msg.slice(0, 255);
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
.content >>> .v-text-field__slot {
  padding-top: 10px !important;
  padding-bottom: -10px !important;
  padding-left: 10px !important;
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
  margin-top: 13px !important;
  margin-right: 10px !important;
}
.content >>> .v-input__icon button {
  color: white !important;
}
</style>
