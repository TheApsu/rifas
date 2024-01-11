export interface User {
  avatar?: string;
  name: string;
  email: string;
  password: string;
  rolType: number;
  confirmPassword?: string;
  phoneNumber?: string;
  _id?: string;
}
