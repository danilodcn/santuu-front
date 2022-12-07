import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";
import { IUserData } from "@/types/user";

class UserDataService extends APIAuthBase {
  async getUserData(userId: number) {
    const url = `/account/user-data/${userId}`;
    return await this.request({ url, method: "GET" });
  }
  async getUserProfile() {
    const url = `/account/account/profile/`;
    return await this.request({ url, method: "GET" });
  }
  async updateUserData(userId: number, form: IUserData) {
    const url = `/account/user-data/${userId}/`;
    const data = form;
    const dataJson = JSON.stringify(data);
    return await this.request({
      url,
      method: "PATCH",
      data: dataJson,
      headers: {
        ...this.config.headers,
        "Content-Type": "application/json",
      },
    });
  }
}

const authProvider = new AuthProvider();
const userDataService = new UserDataService(authProvider);

export { UserDataService, userDataService };
