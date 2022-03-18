export interface User {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface UserWithPassword extends User {
  password: string,
}

export interface LoginReturn {
  user: User,
  token: string
}

export interface TokenReturn {
  data: UserWithPassword,
  iat: number,
  exp: number,
}
