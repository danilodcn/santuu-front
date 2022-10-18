import { APIBase } from ".";

interface AuthProviderInterface {
  authType: string;
  getToken(data: IAuthDTO): Promise<string>;
  verifyToken(): Promise<boolean>;
}

interface IAuthDTO {
  email?: string;
  password?: string;
}

class AuthProvider implements AuthProviderInterface {
  authType = "Bearer";
  api: APIBase = new APIBase();

  async verifyToken(): Promise<boolean> {
    const token = this.storageToken;
    if (!token) return false;

    const url = "/api/token/verify/";
    const data = { token };

    const response = await this.api.request({ url, method: "POST", data });
    if (response.error) return false;
    else return true;
  }

  async getToken(data: IAuthDTO = {}): Promise<string> {
    if (!this.storageToken) {
      const token = await this.requestToken(data);
      this.storageToken = token;
    }

    return this.storageToken;
  }

  private async requestToken(data: IAuthDTO): Promise<string> {
    const url = "/api/token/auth/";

    const response = await this.api.request({ url, method: "GET", data });

    return response.access;
  }

  private get storageToken() {
    const token = window.localStorage.getItem("token");
    return token || "";
  }

  private set storageToken(value: string) {
    window.localStorage.setItem("token", value);
  }
}

export { AuthProviderInterface, AuthProvider };
