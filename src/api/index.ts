import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "http://app.clubesantuu.com.br/",
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
      .catch((error: AxiosError) => {
        console.info("Erro na requisição", error);
        return error.response?.data;
      });
  }
}
