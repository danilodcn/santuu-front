import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "https://app.clubesantuu.com.br/",
};

export class APIBase {
  private client: AxiosInstance;
  constructor(config: AxiosRequestConfig = {}) {
    config = {
      ...baseConfig,
      ...config,
    };
    this.client = axios.create(config);
  }

  request(config: AxiosRequestConfig) {
    return this.client
      .request(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.info("Erro na requisição", error);
      });
  }
}
