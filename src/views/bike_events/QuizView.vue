<template>
  <v-container class="content-container">
    <v-btn @click="getQuiz">Click aqui</v-btn>
    <v-card class="px-0 px-md-5 py-10">
      <quiz-form :quiz="quiz"></quiz-form>
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
  quizID = 2;
  quiz = {};
  async getQuiz() {
    this.quiz = await quizService.getQuiz(this.quizID);
  }

  created() {
    console.log("Criando view do quiz");
    this.getQuiz();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
</style>
