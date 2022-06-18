import { AuthProviderInterface } from "./auth.provider";
import { APIBase } from "./index";

interface IUserDataDTO {
  email: string;
  password: string;
}

class APIAuthBase extends APIBase {
  constructor(private auth: AuthProviderInterface) {
    super();
    this.inicializeAuth();
  }

  private async inicializeAuth() {
    const token = await this.auth.getToken({});
    this.config.headers = {
      ...this.config.headers,
      Authorization: `${this.auth.authType} ${token}`,
    };
  }

  async getToken(data: IUserDataDTO) {
    return this.auth.getToken(data);
  }
}

export { APIAuthBase };
