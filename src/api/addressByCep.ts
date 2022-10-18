import { APIBase } from "./index";

export class AddressByCepService extends APIBase {
  constructor() {
    super({ baseURL: "https://viacep.com.br" });
  }

  async getAddress(cep: string) {
    const url = `/ws/${cep}/json/`;
    return await this.request({ url, method: "GET" });
  }
}
