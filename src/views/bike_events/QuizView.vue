<template>
  <v-container class="content-container">
    <v-card class="px-0 px-md-5 py-10">
      <quiz-form ref="form" :quiz="quiz" v-model="model"></quiz-form>
      <v-card-actions>
        <v-btn @click="submitForm()" class="primary">Enviar Resposta</v-btn>
        <v-btn @click="clearAll()" class="primary">Limpar Respostas</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";
import QuizForm from "@/components/QuizForm.vue";
import { getQuizService } from "@/api/quiz/getQuiz";
import { answerQuestion } from "@/api/quiz/answerQuiz";
import { quizHelper } from "@/utils/quiz";
import { IQuiz } from "@/types/quiz";

@Component({
  components: {
    InfoDialog,
    QuizForm,
  },
  name: "QuizView",
})
export default class QuizView extends Vue {
  quizID = 1;
  quiz: IQuiz = {} as IQuiz;
  model: any[] = [];

  async getQuiz() {
    this.quiz = await getQuizService.handle(this.quizID);
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

  async submitForm() {
    const isValid = (
      this.$refs.form as Vue & { validate: () => any }
    )?.validate();
    if (!isValid) {
      console.log("Não é valido", isValid);
    } else {
      const data = quizHelper.mountRequestData(
        this.model,
        this.quiz.questions,
        this.quizID
      );
      console.log("Dados", data);

      await answerQuestion.handle(data);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
</style>
