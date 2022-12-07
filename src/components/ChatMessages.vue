<template>
  <v-container class="col-12 container-messages">
    <template v-for="(message, i) in messages">
      <v-row
        :key="i"
        :justify="
          profile.personal_info.user == message.sender ? 'end' : 'start'
        "
        class="row-message"
      >
        <div class="message">
          <v-col class="text"> {{ message.message }} <br /> </v-col>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import ChatSender from "@/components/ChatSender.vue";
import { UserDataService } from "@/api/userData";
import { leftPad } from "@/utils/utils";

const userDataService = new UserDataService();

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
  @Prop() messages = [] as IMessage[];
  @Prop() viewer_id!: number;

  already_scrolled = false; //Variável para rolar para baixo a conversa somente no começo

  profile: any;
  leftPad = leftPad;

  created() {
    this.getProfile();
  }

  async getProfile() {
    const response = await userDataService.getUserProfile();
    this.profile = response;
    if (!response.error) {
      this.profile = response;
    } else {
      return;
    }
  }

  updated() {
    const elem = document.querySelector(".container-messages");
    if (elem && !this.already_scrolled) {
      this.already_scrolled = true;
      elem.scrollTo(0, elem.scrollHeight);
    }
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
}
.container-messages {
  max-height: 60vh;
  overflow: scroll;
}
.container-messages::-webkit-scrollbar {
  display: none;
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
