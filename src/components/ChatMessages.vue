<template>
  <v-container class="col-12">
    <template v-for="(message, i) in messages">
      <v-row
        :key="i"
        :justify="20237 == message.sender ? 'end' : 'start'"
        class="row-message"
      >
        <div class="message">
          <v-col> {{ message.message }} <br /> </v-col>
        </div>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import ChatSender from "@/components/ChatSender.vue";

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

  created() {
    console.log();
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
</style>
