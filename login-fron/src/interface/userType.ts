
export interface CreateUserType {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  edad: number;
  imagen_registro: File | null;
}

export interface User {
  id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  fk_rol: string | null;
}