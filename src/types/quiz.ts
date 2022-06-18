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
}

export { IQuiz, IQuestion };
