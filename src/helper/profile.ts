import { UserData } from "@/types/profile";

const nullUserData: UserData = {
  firstName: "",
  lastName: "",
  avatarUrl: "https://avatars.githubusercontent.com/u/31135098?v=4",
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
  constructor(readonly userData = nullUserData) {}
}
