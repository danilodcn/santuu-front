interface IQuestion {
  id: number;
  type: string;
  options: string[];
  title: string;
  description: string;
  required: boolean;
  order: number;
}

interface IQuiz {
  id: number;
  questions: IQuestion[];
  title: string;
  description: string;
  terms_and_conditions: string;
}

export { IQuiz, IQuestion };
