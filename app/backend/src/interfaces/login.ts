export interface ILogin {
  email: string
  password: string
}

export interface IJwtPayload {
  id: number,
  username: string,
  role: string,
  email: string
}
