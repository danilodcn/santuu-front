export interface IPlan {
  name: string;
  amount: number;
}
export interface ICoverage {
  id: number;
  name: string;
  deductible_text: string;
  legal_text: string;
  net_premium: number;
  lmi: number;
  enabled: boolean;
  is_fixed: boolean;
  order: number;
}

export interface IAssociateData {
  id: number;
  brand: string;
  category: string;
  model: string;
  price: number;
  plan: IPlan;
}

export interface IProposalBid {
  id: number;
  number_of_installments: number;
  amount: number;
  discount_amount: number;
  gross_amount: number;
  minimal_amount: number;
}
export interface IProgram {
  id: number;
  name: string;
  flexible_coverage_enabled: boolean;
  flexible_deductible_enabled: boolean;
  image_program: string;
  minimal_premium: number;
  iof_tax_rate: number;
  type: number;
}
export interface IProposalRenovation {
  id: number;
  created_at: string;
  proposal_coverages: ICoverage[];
  associate_data: IAssociateData[];
  iof: number;
  gross_insurance_premium: number;
  program: IProgram;
  proposal_bids: IProposalBid[];
  insurance_premium_discount: number;
  insurance_premium: number;
  calculated_insurance_premium: number;
  deductible_enabled: boolean;
  number_of_installments: number;
  voucher: string;
  minimal_premium_reached: number;
}
