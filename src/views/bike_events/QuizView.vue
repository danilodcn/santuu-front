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
        message: `<b>1 -</b> O Seguro Clube Santuu, Sem Nota, é um seguro feito pelo LMI (Limite Máximo de Indenização) determinado pelo cliente e de acordo com configurações e ano da bicicleta, considerando a depreciação pelo uso.
              <br/><b>2 -</b> Em caso de sinistro total ou parcial, o reembolso será em dinheiro, de acordo com cobertura acionada e LMI (Limite Máximo de Indenização) aceito.
              <br/><b>3 -</b> Nesta modalidade de seguro Sem Nota, NÃO haverá reposição do bem por item igual ou similar ao Novo como no produto convencional do Clube Santuu
              <br/><b>4 -</b> O cliente, ao aceitar esse termo, garante que o produto, apesar de não ter nota fiscal, não é um produto proveniente de roubo/furto ou ato ilícito. A procedência do produto é 100% garantida pelo cliente que está solicitando o seguro.`,
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
