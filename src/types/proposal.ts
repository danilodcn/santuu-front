export interface ICoverage {
  id: number;
  name: string;
  deductible_text: string;
  legal_text: string;
  amount: number;
  lmi: number;
  enabled: boolean;
  is_fixed: boolean;
  order: number;
}

export interface IAssociateBike {
  id: number;
  brand: string;
  category: string;
  serial_number: number;
  model: string;
  price: string;
}

export interface IProgram {
  id: number;
  name: string;
  flexible_coverage_enabled: boolean;
  flexible_deductible_enabled: boolean;
}

export interface IProposalBid {
  id: number;
  number_of_installments: number;
}

export interface IProposal {
  id: number;
  proposal_coverages: ICoverage[];
  associate_bikes: IAssociateBike[];
  iof: number;
  gross_insurance_premium: number;
  program: IProgram;
  proposal_bids: IProposalBid;
  insurance_premium_discount: number;
  insurance_premium: number;
  calculated_insurance_premium: number;
}