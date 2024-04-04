import { User } from './user_interface';
export interface Numbers {
  number: number;
  sold: boolean;
  clicked: boolean;
}

export interface IRifa {
  images: string[];
  name: string;
  endDate: string;
  description: string;
  numbersQuantity: number;
  availableNumbersQuantity: number;
  price: number;
  views: number;
  location: string;
  userId: string;
  user: User;
  sales: number;
  numbers: Numbers[];
  _id?: string;
}
