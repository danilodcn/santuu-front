import { APIBase } from ".";

// FIXME Variável usada apenas para desenvolvimento
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1OTA4MzczLCJqdGkiOiI0YWZmNDUyMmNhOTY0NGZlYTA5YTU5MmIzY2E0MTMxNCIsInVzZXJfaWQiOjIwMjM3LCJmaXJzdF9uYW1lIjoiVmluaWNpdXMgQ2Fpblx1MDBlMyIsInJvbGUiOlsic3VwZXJ1c2VyIl0sInByb2R1Y3RzIjpbXSwicHJvZ3JhbXMiOltdfQ.la0eZTJjTkYiP7e7KTQLLMVdkuP2qOo1JkJesjA_Ekw";

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

    throw new Error("Method not implemented.");
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
    const access_token = ACCESS_TOKEN;

    if (access_token) return access_token;

    const token = window.localStorage.getItem("token");
    return token || "";
  }

  private set storageToken(value: string) {
    window.localStorage.setItem("token", value);
  }
}

export { AuthProviderInterface, AuthProvider };
