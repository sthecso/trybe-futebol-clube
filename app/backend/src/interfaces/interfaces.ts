export interface ILogin {
  email: string;
  password: string;
}

export interface ISecretCompare extends ILogin {
  password: string;
}
