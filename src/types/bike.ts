export interface IBrand {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IModel {
  id: string;
  description_1: string;
  price: number;
  category: number;
  brand: number;
}

export interface IStore {
  id: string;
  trading_name: string;
}
