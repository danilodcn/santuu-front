import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";
import { IAddress } from "@/types/address";

class AddressService extends APIAuthBase {
  async getAddress(addressId: number) {
    const url = `/api/address/${addressId}`;
    return await this.request({ url, method: "GET" });
  }
  async updateAddress(userId: number, form: IAddress) {
    const url = `/api/address/${userId}/`;
    const data = form;
    const dataJson = JSON.stringify(data);
    return await this.request({
      url,
      method: "PATCH",
      data: dataJson,
      headers: {
        ...this.config.headers,
        "Content-Type": "application/json",
      },
    });
  }
}

const authProvider = new AuthProvider();
const addressService = new AddressService(authProvider);

export { AddressService, addressService };
