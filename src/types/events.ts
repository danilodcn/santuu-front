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

export interface IFormCheckin {
  bike_brand: string;
  bike_category: string;
  bike_model: string;
  bike_right?: File;
  bike_left?: File;
  bike_event: string;
}
