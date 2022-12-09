<template>
  <v-row class="">
    <div class="col-10 tip">
      <Transition name="next" @after-leave="showNext">
        <div v-if="show" class="text-justify">
          {{ tips[current_index] }}
        </div>
      </Transition>
    </div>
    <div class="col-2">
      <v-icon @click="passTip"> mdi-chevron-right </v-icon>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { user_types } from "@/utils/sos";

@Component
export default class LoadingTips extends Vue {
  @Prop() type!: number;
  @Prop() time_showing_ms!: number;

  show = true;
  interval!: any;

  current_index = 0;

  cyclist_tips = [
    "Você pode avaliar o mecânico após a finalização do chamado",
    "Você pode entrar em contato com o mecânico assim que ele estive a caminho",
    "A Santuu dispõe de serviços de seguros especiais para você, ciclista!",
    "Acesse app.clubesantuu.com.br e fique por dentro das nossas novidades!",
  ];

  mechanic_tips = [
    "Você deve clicar em iniciando reparo quando encontrar o cliente",
    "Você deve clicar em finalizar quando o reparo for efetuado",
  ];

  tips = [""];

  nextTip() {
    this.show = false;
  }
  showNext() {
    this.show = true;
    this.current_index = (this.current_index + 1) % this.tips.length;
  }

  passTip() {
    clearInterval(this.interval);
    this.nextTip();
    this.interval = setInterval(this.nextTip, this.time_showing_ms);
  }

  created() {
    this.interval = setInterval(this.nextTip, this.time_showing_ms);
    this.tips =
      this.type == user_types.cyclist ? this.cyclist_tips : this.mechanic_tips;
    console.log(this.type);
    console.log(user_types.cyclist);
    console.log(this.type == user_types.cyclist);
  }
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
@keyframes get-out {
  0% {
    transform: translateX(0%);
    color: #000;
  }
  100% {
    transform: translateX(-100%);
    color: #fff;
  }
}
@keyframes get-in {
  0% {
    transform: translateX(100%);
    color: #fff;
  }
  100% {
    color: #000;
    transform: translateX(0%);
  }
}
.next-enter-active {
  animation: get-in 0.2s ease-in-out;
}

.next-leave-active {
  animation: get-out 0.4s ease-in-out;
}
.tip {
  font-size: 0.8em;
  line-height: 1em;
  overflow: hidden;
}
</style>
