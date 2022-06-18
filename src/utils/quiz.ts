import { IQuestion } from "@/types/quiz";

interface ITypeComponent {
  [key: string]: { name: string; props: any[] };
}

const COMPONENT_TYPES: ITypeComponent = {
  short_answer: {
    name: "v-text-field",
    props: [{ placeholder: "sua resposta" }],
  },
  long_answer: { name: "v-textarea", props: [] },
  select: { name: "v-select", props: [] },
};

interface IQuestionTypeComponent {
  component: string;
  props: any[];
  title: string;
  description: string;
}

class QuizHelper {
  handle(questions: IQuestion[]): IQuestionTypeComponent[] {
    const questionTypeComponents: IQuestionTypeComponent[] = [];

    questions.forEach((question) => {
      const type = COMPONENT_TYPES[question.type];

      if (type) {
        const props = type.props;
        props.push({ items: question.options });

        questionTypeComponents.push({
          component: type.name,
          props: props,
          title: question.title,
          description: question.description,
        });
      }
    });

    return questionTypeComponents;
  }
}

const quizHelper = new QuizHelper();

export { quizHelper, QuizHelper, IQuestionTypeComponent };
