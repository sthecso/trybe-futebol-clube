export interface LoginDTO extends IEmailAndPasswordDTO {
  username: string;
  role: string;
}

export interface IEmailAndPasswordDTO {
  email: string;
  password: string;
}
