import { APIAuthBase } from "./auth";
import { AuthProvider } from "./auth.provider";
import { IQuiz } from "@/types/quiz";

class QuizService extends APIAuthBase {
  async getQuiz(id: number): Promise<IQuiz> {
    const url = `/api/bike-event/questions/quiz/${id}`;
    return this.request({ url, method: "GET" });
  }
}

const authProvider = new AuthProvider();
const quizService = new QuizService(authProvider);

export { QuizService, quizService };
