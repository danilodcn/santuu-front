import { APIAuthBase } from "./auth";

const url = `account/profile/`;

export class ProfileService extends APIAuthBase {
  async getProfile(): Promise<ProfileDTO> {
    return await this.request({ url, method: "GET" });
  }

  async saveProfile(data: ProfileDTO, image: Blob | undefined = undefined) {
    const formData = new FormData();
    if (image) {
      formData.append("avatar", image);
    }
    formData.append("data", JSON.stringify(data));

    this.config.headers = {
      ...this.config.headers,
      "Content-Type": "multipart/form-data",
    };
    return await this.request({
      url,
      method: "POST",
      data: formData,
    });
  }
}

type ProfileDTO = {
  first_name: string;
  last_name: string;
  email: string;
  personal_info: {
    email_message_enabled: boolean;
    phone_message_enabled: boolean;
    avatar?: string;
    delete_avatar?: boolean;
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string;
    cpf: string;
    rg: string;
    phone: string;

    address: {
      city: string;
      address_type: string;
      complement: string;
      neighborhood: string;
      number: string;
      state: string;
      street: string;
      zipcode: string;
    };
  };
};
