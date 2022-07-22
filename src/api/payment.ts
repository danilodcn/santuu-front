import { APIAuthBase } from "./auth";

class PaymentService extends APIAuthBase {
  async getPaymentOptions(proposal_id: number | string) {
    const url = `dashboard/proposal/payment-options/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }

  async handlePay(input: Input) {
    const url = `/api/payments/`;
    return await this.request({ url, method: "GET" });
  }

  // private handleRequestData(input: Input): PaymentInputData {
  //   const [expiry_year, expiry_month] = input.date.split("-");
  //   const card_number = input.card_number;

  //   const data: PaymentInputData = {
  //     ...input,
  //     expiry_month,
  //     expiry_year,
  //     card_number,
  //   };
  //   return data;
  // }
}

type Input = {
  amount: number;
  card_holder: string;
  card_number: string;
  date: string;
};

type PaymentInputData = {
  amount: number;
  card_holder: string;
  card_number: string;
  card_security_code: string;
  expiry_month: string;
  expiry_year: string;
  external_reference: number | string;
  number_installments: number;
  payment_type: string;
  scheme: string;
  type_installment: string;
};

const paymentService = new PaymentService();

export { PaymentService, paymentService };
