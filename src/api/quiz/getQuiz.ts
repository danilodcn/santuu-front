import { APIAuthBase } from "@/api/auth";
import { AuthProvider } from "@/api/auth.provider";
import { IQuiz } from "@/types/quiz";

class GetQuizService extends APIAuthBase {
  async handle(id: number): Promise<IQuiz> {
    const url = `/api/bike-event/questions/quiz/${id}`;
    return this.request({ url, method: "GET" });
  }
}

const authProvider = new AuthProvider();
const getQuizService = new GetQuizService(authProvider);

export { GetQuizService, getQuizService };
