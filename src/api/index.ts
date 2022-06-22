import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "https://app.clubesantuu.com.br/",
  // baseURL: "http://localhost:8000/",
};

export class APIBase {
  private client: AxiosInstance;
  public config!: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig = {}) {
    config = {
      ...baseConfig,
      ...config,
    };
    this.client = axios.create(config);
    this.config = {};
  }

  request(config: AxiosRequestConfig) {
    const _config = {
      ...this.config,
      ...config,
    };
    return this.client
      .request(_config)
      .then((res) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.info("Erro na requisição", error);
        return {
          axiosError: error,
          error: true,
        };
      });
  }
}
