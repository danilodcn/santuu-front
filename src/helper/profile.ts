import { UserData } from "@/types/profile";
import { ProfileService } from "@/api/profile";

const nullUserData: UserData = {
  firstName: "",
  lastName: "",
  avatar: {
    url: "",
  },
  birthDate: "",
  cellPhone: "",
  cpf: "",
  rg: "",
  email: "",
  emailMessageEnabled: false,
  phoneMessageEnabled: true,
  address: {
    city: "",
    complement: "",
    number: "",
    state: "",
    street: "",
    zipcode: "",
    neighborhood: "",
    addressType: "",
  },
};

export class ProfileHandler {
  service!: ProfileService;
  constructor(readonly userData = nullUserData) {
    this.service = new ProfileService();
  }
  async getProfile() {
    const profile = await this.service.getProfile();
    const personal_info = profile.personal_info;
    const address = personal_info.address;

    this.userData.email = profile.email;
    this.userData.firstName = profile.first_name;
    this.userData.lastName = profile.last_name;

    this.userData.avatar.url = personal_info.avatar || "";
    this.userData.birthDate = personal_info.birth_date;
    this.userData.cellPhone = personal_info.phone;
    this.userData.cpf = personal_info.cpf;
    this.userData.rg = personal_info.rg;
    this.userData.emailMessageEnabled = personal_info.email_message_enabled;
    this.userData.phoneMessageEnabled = personal_info.phone_message_enabled;

    this.userData.address.addressType = address.address_type;
    this.userData.address.city = address.city;
    this.userData.address.complement = address.complement;
    this.userData.address.neighborhood = address.neighborhood;
    this.userData.address.number = address.number;
    this.userData.address.state = address.state;
    this.userData.address.street = address.street;
    this.userData.address.zipcode = address.zipcode;
  }

  async saveProfile(): Promise<SaveProfileOutput> {
    const res = await this.service.saveProfile(
      {
        email: this.userData.email,
        first_name: this.userData.firstName,
        last_name: this.userData.lastName,
        personal_info: {
          email: this.userData.email,
          delete_avatar: !!this.userData.avatar.delete,
          first_name: this.userData.firstName,
          last_name: this.userData.lastName,
          birth_date: this.userData.birthDate,
          cpf: this.userData.cpf,
          rg: this.userData.rg,
          phone: this.userData.cellPhone,
          email_message_enabled: this.userData.emailMessageEnabled,
          phone_message_enabled: this.userData.phoneMessageEnabled,
          address: {
            address_type: this.userData.address.addressType,
            city: this.userData.address.city,
            complement: this.userData.address.complement,
            neighborhood: this.userData.address.neighborhood,
            number: this.userData.address.number,
            state: this.userData.address.state,
            street: this.userData.address.street,
            zipcode: this.userData.address.zipcode,
          },
        },
      },
      this.userData.avatar.file
    );

    if (res.error) {
      const data = res?.axiosError?.response?.data;
      let message = data?.detail;

      if (data.email) {
        message = "já existe uma conta com esse email, tente outro!";
      }

      if (!message) {
        message = res?.axiosError?.response?.data?.message;
      }
      return { error: true, message };
    }
    return { error: false, message: res?.message };
  }
}

type SaveProfileOutput = { error: boolean; message: string };
