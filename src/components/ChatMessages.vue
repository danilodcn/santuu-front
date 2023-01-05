<template>
  <v-container class="col-12 container-messages">
    <template v-for="(message, i) in messages">
      <v-row
        :key="i"
        :justify="userId == message.sender ? 'end' : 'start'"
        class="row-message"
      >
        <div class="message">
          <v-col class="text"
            ><span style="word-break: break-word">
              {{ message.message }}</span
            ></v-col
          >
          <v-col class="hour">
            {{
              leftPad(new Date(message.time).getHours(), 2, "0") +
              ":" +
              leftPad(new Date(message.time).getMinutes(), 2, "0")
            }}
            <br />
          </v-col>
        </div>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import ChatSender from "@/components/ChatSender.vue";
import { leftPad } from "@/utils/utils";

interface IMessage {
  id: number;
  message: string;
  time: string;
  chat: number;
  sender: number;
}

@Component({
  components: { EventCard, ChatSender },
})
export default class ChatMessages extends Vue {
  @Prop() messages!: IMessage[];
  @Prop() viewer_id!: number;
  @Prop() profile!: any;

  get messagesLength() {
    return this.messages.length;
  }
  leftPad = leftPad;

  get userId() {
    return this.profile?.personal_info?.user;
  }

  scrollToBottom() {
    const elem = document.querySelector(".container-messages");
    if (elem) {
      setTimeout(() => {
        elem.scrollTo(0, elem.scrollHeight);
      }, 200);
    }
  }

  @Watch("messagesLength")
  onMessagesLengthChange() {
    this.scrollToBottom();
  }
}
</script>

<style lang="scss" scoped>
.row-message {
  margin-bottom: 5px;
}
.message {
  max-width: 70%;
  border-radius: 5px;
  font-size: 1em;
  background: #eeeeee;
  height: fit-content;
}
.container-messages {
  max-height: 100%;
  overflow: scroll;
  height: fit-content;
}
.container-messages::-webkit-scrollbar {
  display: none;
}
.container-messages {
  scrollbar-width: none;
}
.text {
  padding-bottom: 2px;
}
.hour {
  text-align: end;
  font-size: 0.6em;
  padding-top: 0px;
  padding-bottom: 2px;
}
</style>
