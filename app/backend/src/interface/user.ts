export interface IUserWithIdDTO {
  id: number,
  username: string,
  role: string,
  email: string
  password?:string
}

export interface IUserWithTokenDTO {
  user:IUserWithIdDTO,
  token:string
}

export interface IuserDT0 {
  email:string,
  password:string
}

export interface IUserJwt extends IUserWithIdDTO {
  exp: string
  iat: string
}
