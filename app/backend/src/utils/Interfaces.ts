export interface User {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface LoginReturn {
  user: User,
  token: string
}
