import { IQuestion } from "@/types/quiz";
import { required } from "@/utils/rules";

interface ITypeComponent {
  [key: string]: { name: string; props: any[] };
}

const COMPONENT_TYPES: ITypeComponent = {
  short_answer: {
    name: "v-text-field",
    props: [{ placeholder: "sua resposta", clearable: true, filled: true }],
  },
  long_answer: {
    name: "v-textarea",
    props: [{ placeholder: "sua resposta", clearable: true, filled: true }],
  },
  list: {
    name: "v-select",
    props: [{ placeholder: "sua resposta", clearable: true, filled: true }],
  },
  select_box: {
    name: "select-box",
    props: [{ multiple: true }],
  },
  select: { name: "select-box", props: [{ multiple: false }] },
};

interface IQuestionTypeComponent {
  component: string;
  props: any[];
  title: string;
  description: string;
  model: any;
}

interface IAnswer {
  question: number;
  answer: string;
}

interface IMountAnswer {
  quiz: number;
  answers: IAnswer[];
  check: boolean;
}

class QuizHelper {
  mountQuestions(questions: IQuestion[]): IQuestionTypeComponent[] {
    const questionTypeComponents: IQuestionTypeComponent[] = [];

    questions.forEach((question) => {
      const type = COMPONENT_TYPES[question.type];

      if (type) {
        const props = type.props;
        props.push({ items: question.options });

        if (question.required) {
          props.push({ rules: [required] });
        }

        questionTypeComponents.push({
          component: type.name,
          props: props,
          title: question.title,
          description: question.description,
          model: null,
        });
      }
    });

    return questionTypeComponents;
  }

  mountRequestData(
    answers: string[],
    questions: IQuestion[],
    quizID: number,
    check: boolean
  ): IMountAnswer {
    const res: IMountAnswer = { quiz: quizID, answers: [], check: check };
    questions.forEach((value, i) => {
      const question = value.id;
      let answer = answers[i] || "";
      if (Array.isArray(answer)) {
        answer = answer.join(";");
      }
      res.answers.push({ question, answer });
    });
    console.log(res);
    return res;
  }
}

const quizHelper = new QuizHelper();

export { quizHelper, QuizHelper, IQuestionTypeComponent };
