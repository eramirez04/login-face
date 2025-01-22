export interface UserType {
  username: string;
  password: string;
  email: string;
}

export interface CreateUserType {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  edad: number;
  imagen_registro: File | null;
}
