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
        <span class="text-subtitle-1">{{ question.title }}</span>
        <v-spacer />
        <v-subheader> {{ question.description }} </v-subheader>
        <v-spacer />
        Resposta: {{ question.model }}
        <component
          :is="question.component"
          v-bind="question.props"
          v-model="question.model"
        />
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
import SelectBox from "./shared/SelectBox.vue";

@Component({
  components: { VSelect, VTextarea, VTextField, SelectBox },
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
