<template>
  <v-container class="px-4 container">
    <v-toolbar
      color="transparent"
      flat
      class="col-xs-12 offset-xs-0 col-md-8 offset-md-2 pt-4"
    >
      <v-btn icon light @click="backButton()">
        <v-icon color="grey darken-2"> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">
        <div class="pa-0 ma-0">
          <div class="pa-0 ma-0 title-chat">Chat - {{ name }}</div>
          <div class="pa-0 ma-0 body-2">
            #{{ leftPad(order_data.id * 33, 8, "0") }}00
          </div>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-row class="col-xs-12 offset-xs-0 col-md-8 offset-md-2 msgs mt-4">
      <chat-messages :messages="messages" :profile="profile"></chat-messages>
    </v-row>
    <chat-sender
      :order_data="order_data"
      class="mx-xs-0 px-0 col-xs-12 offset-xs-0 col-md-8 offset-md-2"
    ></chat-sender>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { sosService } from "@/api/sos";
import { IOrder } from "@/types/sos";
import { leftPad } from "@/utils/utils";
import { user_types } from "@/utils/sos";
import ChatSender from "@/components/ChatSender.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import { UserDataService } from "@/api/userData";

const userDataService = new UserDataService();

interface IMessage {
  id: number;
  message: string;
  time: string;
  chat: number;
  sender: number;
}

@Component({
  components: { EventCard, ChatSender, ChatMessages },
})
export default class Available extends Vue {
  order_data = {} as IOrder;
  messages = [] as IMessage[];
  last_message_time = "";
  user_type = -1;

  get name() {
    if (this.user_type == this.user_types.cyclist) {
      return this.order_data.mechanic_name;
    }
    return this.order_data.associate_name;
  }

  profile = {} as any;

  leftPad = leftPad;
  user_types = user_types;

  interval!: any;
  created() {
    this.getOpenOrder();
    this.interval = setInterval(this.refreshingMessages, 5000);
  }
  beforeDestroy() {
    clearInterval(this.interval);
  }

  backButton() {
    if (this.user_type == this.user_types.cyclist) {
      this.$router.push({ path: "/sos/waiting/" });
    } else {
      this.$router.push({ path: "/sos/active-call/" });
    }
  }

  chat() {
    this.$router.push({ path: "/sos/chat/" });
  }

  async getProfile() {
    const response = await userDataService.getUserProfile();
    if (!response.error) {
      this.profile = response;
    } else {
      return;
    }
  }

  async getOpenOrder() {
    const response = await sosService.getOpenOrder();
    if (!response.error) {
      this.order_data = response;
    } else {
      return;
    }
    await this.getProfile();
    this.user_type =
      this.order_data.associate == this.profile.personal_info?.user
        ? this.user_types.cyclist
        : this.user_types.mechanic;
    this.refreshingMessages();
  }

  async getMessages() {
    const response = await sosService.getMessages(
      this.order_data.id,
      this.last_message_time
    );
    if (response.length > 0) {
      this.messages = [...this.messages, ...response].sort((a, b) => {
        return new Date(a.time) > new Date(b.time) ? 1 : -1;
      });
      this.last_message_time = this.messages.slice(-1)[0].time;
    }
  }

  refreshingMessages() {
    this.getMessages();
    this.$forceUpdate();
  }
}
</script>

<style lang="scss">
@media (min-width: 768px) {
  .container {
    background: #fff;
    max-width: 600px;
    margin-top: 20px;
    border-radius: 10px;
  }
}
@keyframes blinking {
  from {
    background-color: #ddddb3;
  }
  to {
    background-color: #b8b703;
  }
}
.blink {
  -webkit-animation-name: blinking;
  animation-name: blinking;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.msgs {
  height: 70vh;
}
.title-chat {
  line-height: 100%;
}
.container {
  max-height: 100vh;
}
.row {
  max-height: 100vh;
}
</style>
