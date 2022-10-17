export interface IUserData {
  cpf: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  rg: string;
  birth_date: string;
  share_pep_information: string;
  // Se for PEP
  occupation: string;
  income_bracket: string;
  //Se tiver um relacionamento próximo
  cpf_related: string;
  name_related: string;
  degree_related: string;
  income_bracket_related: string;
  occupation_related: string;
}
