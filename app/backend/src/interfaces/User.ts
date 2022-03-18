export interface UserDTO {
  id?: number;
  username: string;
  role: string;
  email: string;
}

export interface IUser extends UserDTO {
  password: string;
}
