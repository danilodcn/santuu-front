import { APIAuthBase } from "./auth";

class PaymentService extends APIAuthBase {
  async getPaymentOptions(proposal_id: number | string) {
    const url = `dashboard/proposal/payment-options/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }

  async handlePayment(input: Input) {
    const url = `/api/payments/`;
    const data = this.handleRequestData(input);
    return await this.request({ url, method: "POST", data });
  }

  private handleRequestData(input: Input): PaymentInputData {
    const [expiry_year, expiry_month] = input.date.split("-");
    const card_number = input.cardNumber;

    const data: PaymentInputData = {
      expiry_month,
      expiry_year,
      card_number,
      payment_type: "proposal",
      card_security_code: input.securityCode,
      scheme: input.scheme,
      card_holder: input.name,
      amount: input.amount,
      external_reference: input.proposalID,
      number_installments: input.numberOfInstallments,
      type_installment: input.typeInstallment,
    };
    return data;
  }
}

type Input = {
  proposalID: number | string;
  scheme: string;
  name: string;
  cardNumber: string;
  date: string;
  securityCode: string;
  installments: any;
  amount: number;
  typeInstallment: string;
  numberOfInstallments: number;
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
  payment_type: "proposal";
  scheme: string;
  type_installment: string;
};

const paymentService = new PaymentService();

export { PaymentService, paymentService };
