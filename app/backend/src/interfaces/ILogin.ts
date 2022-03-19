export interface LoginDTO extends IEmailAndPasswordDTO {
  id: number;
  username: string;
  role: string;
}

export interface IEmailAndPasswordDTO {
  email: string;
  password: string;
}
