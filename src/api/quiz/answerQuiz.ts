import { APIAuthBase } from "@/api/auth";
import { AuthProvider } from "@/api/auth.provider";

class AnswerQuestion extends APIAuthBase {
  async handle(data: any) {
    const url = `/api/bike-event/questions/answer/`;
    return this.request({ url, method: "POST", data });
  }
}

const authProvider = new AuthProvider();
const answerQuestion = new AnswerQuestion(authProvider);

export { AnswerQuestion, answerQuestion };
