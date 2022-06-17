export interface IEvents {
  name: string;
  description: string;
  poster: string;
  initial_date: string;
  final_date: string;
}

export interface IFormItems {
  events: IEvents[];
}
