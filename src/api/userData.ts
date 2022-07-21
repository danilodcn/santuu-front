import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

export class UserDataService extends APIAuthBase {
  async getUserData(userId: number) {
    const url = `/account/user-data/${userId}`;
    return await this.request({ url, method: "GET" });
  }
}
