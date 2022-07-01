<template>
  <v-container class="content-container">
    <v-card class="pa-5 pa-md-15">
      <v-card-title v-text="quiz.title" class="text-h4" />
      <v-spacer />
      <v-card-subtitle class="text-subtitle-1 text-justify">
        <div v-html="quiz.description" />
      </v-card-subtitle>
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
import { Mutation } from "vuex-class";
import { quizHelper } from "@/utils/quiz";
import { IQuiz } from "@/types/quiz";
import { MutationTypes } from "@/store";

type CallFunctionLoading = (loading: boolean) => void;

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

  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;

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
        messageOk: "Confirmar cadastro",
        messageCancel: "Voltar",
        agreeFunction: this.submitForm,
      });
    }
  }

  async submitForm() {
    this.changeLoading(true);

    const data = quizHelper.mountRequestData(
      this.model,
      this.quiz.questions,
      this.quizID
    );

    let response = await answerQuestion.handle(data);
    console.log(response);

    if (response.error) {
      this.fail(response);
      return;
    }

    this.changeMainDialog({
      msg: "Sua inscrição foi enviada por e-mail e SMS",
      title: "Cadastrado com sucesso",
      persistent: true,
      active: true,
      bntClose: false,
      btnOkOnly: true,
      msgOk: "Ir para meus eventos",
      ident: false,
      afterFunction: this.toMyEvents,
    });

    this.changeLoading(false);
  }

  toMyEvents(value: boolean) {
    this.$router.push({ path: "/bike-events/events?type=my_events" });
  }

  fail(response: any) {
    this.changeLoading(false);
    this.changeMainDialog({
      msg: response.axiosError.response.data.error,
      title: "Erro",
      persistent: true,
      active: true,
      bntClose: true,
      ident: false,
    });
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
