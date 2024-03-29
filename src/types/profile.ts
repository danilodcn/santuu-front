export type UserData = {
  firstName: string;
  lastName: string;
  avatar: { url: string; file?: Blob; delete?: boolean };
  email: string;
  cellPhone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  emailMessageEnabled: boolean;
  phoneMessageEnabled: boolean;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    state: string;
    city: string;
    zipcode: string;
    addressType: string;
  };
};
