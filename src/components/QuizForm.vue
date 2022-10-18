<template>
  <v-form elevation="0" ref="form">
    <v-col
      v-for="(question, i) in questions"
      :key="i"
      :class="{ grouped: question.group }"
    >
      <span class="text-subtitle-1">{{ question.title }}</span>
      <v-spacer />
      <span class="mx-0 px-0 text-body-2 question-description">{{
        question.description
      }}</span>
      <v-spacer />
      <component
        :is="question.component"
        v-bind="question.props"
        v-model="value[i]"
        v-mask="question.mask"
      />
    </v-col>
  </v-form>
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
export default class QuizForm extends Vue {
  @Prop({ default: {} }) quiz!: IQuiz;
  @Prop({ default: () => [] }) value!: any[];
  questions: IQuestionTypeComponent[] = [];

  @Watch("quiz.questions")
  onQuizQuestionsChange(val: IQuestion[]) {
    if (val) {
      this.questions = quizHelper.mountQuestions(val);

      this.questions.forEach((item, i) => {
        this.value[i] = item.model;
      });
    }
  }

  created() {
    try {
      this.$watch(() => this.value, this.onModelChanged);
    } catch {
      console.log("");
    }
  }

  onModelChanged(val: any[]) {
    this.value = val;
    this.$emit("input", val);
  }

  validate() {
    return (this.$refs.form as Vue & { validate: () => any })?.validate();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.grouped {
  padding-top: 0px;
  padding-bottom: 0px;
}
.question-description {
  color: #a7a7a7 !important;
}
</style>
