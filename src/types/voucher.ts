interface IVoucher {
  type: string;
  name: string;
  token: string;
  discountPercentage: string;
  initialDate: string;
  expirationDate: string;
  enabled: string;
  compulsory: string;
  isValid: string;
}

export { IVoucher };
