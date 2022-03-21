export interface Iuser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface Ilogin {
  email: string;
  password: string;
}
