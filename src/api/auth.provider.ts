import { APIBase } from ".";

// FIXME Variável usada apenas para desenvolvimento
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NjAyMDQ4LCJqdGkiOiI1NmIxYzRjNTllMDM0ZjVmYmQ3ZDViN2E1ZTg4ZjZkMSIsInVzZXJfaWQiOjE3MTk4LCJmaXJzdF9uYW1lIjoiVEVTVEUiLCJyb2xlIjpbInN1cGVydXNlciJdLCJwcm9kdWN0cyI6WyJTQSIsIlNBIiwiU0EiLCJTQSIsIlNBIl0sInByb2dyYW1zIjpbMCwxLDMsMCwwXSwic2hvcF9uYW1lIjoiU2FudHV1IEJpa2UgRWNvc3lzdGVtIn0.oCbOSwMdgMEmAMCJk4oTndRzDGW0RhhdnpU09yfDWPE";

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
    console.log(response);

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
    console.log(response);

    return response.access;
  }

  private get storageToken() {
    const access_token = ACCESS_TOKEN;
    console.log(access_token, "access_token do env");

    if (access_token) return access_token;

    const token = window.localStorage.getItem("token");
    console.log(token, "token");
    return token || "";
  }

  private set storageToken(value: string) {
    window.localStorage.setItem("token", value);
  }
}

export { AuthProviderInterface, AuthProvider };
