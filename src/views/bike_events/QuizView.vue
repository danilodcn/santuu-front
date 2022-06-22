<template>
  <v-container class="content-container">
    <v-card class="px-0 px-md-5 py-10">
      <quiz-form :quiz="quiz" v-model="model"></quiz-form>
      <v-card-actions>
        <v-btn type="submit" class="primary">Enviar Resposta</v-btn>
        <v-btn @click="clearAll()" class="primary">Limpar Respostas</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import QuizForm from "@/components/QuizForm.vue";
import { quizService } from "@/api/quiz";

@Component({
  components: {
    InfoDialog,
    QuizForm,
  },
  name: "QuizView",
})
export default class QuizView extends Vue {
  quizID = 1;
  quiz = {};
  model: any[] = [];

  async getQuiz() {
    this.quiz = await quizService.getQuiz(this.quizID);
  }

  onChange(val: any) {
    this.model = val;
  }

  created() {
    this.getQuiz();
  }

  clearAll() {
    this.model = this.model.map(() => null);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
</style>
