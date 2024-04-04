import { RolTypes } from '../constants/rol-type';

export interface User {
  avatar: string;
  name: string;
  rolType: RolTypes;
  email: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber: string;
  location: string;
  verificated: boolean;
}
