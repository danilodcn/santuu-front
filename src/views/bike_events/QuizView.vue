<template>
  <v-container class="content-container">
    <v-card class="pa-5 pa-md-15">
      <v-card-title v-text="quiz.title" class="text-h4" />
      <v-spacer />
      <v-card-subtitle
        v-text="quiz.description"
        class="text-subtitle-1 text-justify"
      />
      <quiz-form ref="form" :quiz="quiz" v-model="model"></quiz-form>
      <v-card-actions class="justify-end">
        <v-btn @click="clearAll()" class="px-7">Limpar</v-btn>
        <v-btn @click="confirm()" class="primary px-7">Cadastrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VuePlus } from "@/utils/utils";
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
export default class QuizView extends VuePlus {
  quiz: IQuiz = {} as IQuiz;
  model: any[] = [];

  get quizID() {
    const id = this.$route.query.quiz as string;
    return Number(id);
  }

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

  confirm() {
    const isValid = (
      this.$refs.form as Vue & { validate: () => any }
    )?.validate();
    if (isValid) {
      this.requestAcceptTerms({
        message: this.quiz.terms_and_conditions,
        messageOk: "Continuar",
        messageCancel: "Voltar",
        agreeFunction: this.submitForm,
      });
    }
  }

  async submitForm() {
    const data = quizHelper.mountRequestData(
      this.model,
      this.quiz.questions,
      this.quizID
    );
    console.log("Dados", data);

    await answerQuestion.handle(data);

    this.changeMainDialog({
      msg: "Seu cadastro foi concluído com sucesso",
      title: "Cadastrado com sucesso",
      persistent: true,
      active: true,
      bntClose: false,
      btnOkOnly: true,
      msgOk: "Ir para meus eventos",
      ident: false,
      afterFunction: this.toMyEvents,
    });
  }

  toMyEvents(value: boolean) {
    this.$router.push({ path: "/bike-events/events?type=my_events" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.content-container {
  color: $main-dark-color;
  margin: 30px auto 30px auto;
  max-width: 1080px;
}
.text-h4 {
  word-break: break-word !important;
}
</style>
