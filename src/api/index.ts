import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:8000/",
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
        console.log("Resposta da requisição", res);
        return res.data;
      })
      .catch((error) => {
        console.log("erro na requisição", error);
      });
  }
}
