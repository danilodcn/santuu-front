import { IAddress } from "@/types/address";
import { IQuiz } from "./quiz";

export interface IEvent {
  id?: number;
  name: string;
  description: string;
  poster: string;
  initial_date: string;
  final_date: string;
  coordinates: string;
  address?: IAddress;
  registered?: boolean;
  quiz?: IQuiz;
}

export interface IFormItems {
  events: IEvent[];
}

export interface IFormCheckin {
  bike_brand: string;
  bike_category: string;
  bike_model: string;
  bike_right?: File;
  bike_left?: File;
  bike_event: string;
}
