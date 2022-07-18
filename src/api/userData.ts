import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

export class UserDataService extends APIAuthBase {
  async getUserData() {
    const url = `/account/user-data/`;
    return await this.request({ url, method: "GET" });
  }
}
