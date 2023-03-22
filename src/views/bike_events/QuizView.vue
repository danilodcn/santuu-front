<template>
  <v-container class="content-container">
    <v-card class="pa-5 pa-md-15">
      <v-card-title v-text="`Inscrição no ${quiz.title}`" class="text-h4" />
      <v-spacer />
      <v-card-subtitle class="text-subtitle-1 text-justify">
        <div v-html="quiz.description"></div>
      </v-card-subtitle>
      <quiz-form ref="form" :quiz="quiz" v-model="model"></quiz-form>
      <v-checkbox
        class="accept px-3"
        label="Aceito receber por e-mail informações, ofertas e benefícios do Clube Santuu!"
        v-model="checkbox_email"
      />
      <v-checkbox
        class="accept px-3"
        label="Aceito receber por celular informações, ofertas e benefícios do Clube Santuu!"
        v-model="checkbox_phone"
      />
      <v-card-actions class="justify-end mt-15">
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
  checkbox_email: any = true;
  checkbox_phone: any = true;

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
      this.quizID,
      this.checkbox_email,
      this.checkbox_phone
    );

    let response = await answerQuestion.handle(data);

    if (response.error) {
      this.fail(response);
      return;
    }

    this.changeMainDialog({
      msg: "Confirmação enviada por e-mail e SMS.",
      title: "PARABÉNS! INSCRIÇÃO REALIZADA COM SUCESSO!",
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
      title: "Erro!",
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
.accept::v-deep label {
  font-size: 14px !important;
}
.content-container {
  color: $main-dark-color;
  margin: 30px auto 30px auto;
  max-width: 1080px;
}
.text-h4 {
  word-break: break-word !important;
}
</style>
