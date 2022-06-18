<template>
  <v-card>
    <v-card-title v-text="quiz.title" class="text-h4" />
    <v-spacer />
    <v-card-subtitle
      v-text="quiz.description"
      class="text-subtitle-1 text-justify"
    />
    <v-card elevation="0">
      <v-col v-for="(question, i) in questions" :key="i">
        <span>{{ question.title }}</span>
        <v-spacer />
        <span>{{ question.description }}</span>
        <component :is="question.component" v-bind="question.props" />
      </v-col>
      <v-card-actions>
        <v-btn>Enviar Resposta</v-btn>
        <v-btn>Limpar Formulário</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { IQuestion, IQuiz } from "@/types/quiz";
import { quizHelper, IQuestionTypeComponent } from "@/utils/quiz";
import { VSelect, VTextarea, VTextField } from "vuetify/lib";

@Component({
  components: { VSelect, VTextarea, VTextField },
})
export default class MainDialog extends Vue {
  @Prop({ default: {} }) quiz!: IQuiz;
  questions: IQuestionTypeComponent[] = [];

  @Watch("quiz.questions")
  onQuestionChange(val: IQuestion[]) {
    if (val) {
      this.questions = quizHelper.handle(val);
    }
  }
}
</script>
