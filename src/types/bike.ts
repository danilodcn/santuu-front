export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  description_1: string;
  price: number;
  category: number;
  brand: number;
}

export interface Store {
  id: string;
  trading_name: string;
}
