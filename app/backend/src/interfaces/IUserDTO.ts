export type Indexable = {
  id?: number
};

export type Entity = Indexable & {
  username: string;
  role: string;
};
export type IUserDTO = Entity & {
  email: string;
  password: string;
};

export type UserWithoutPassword = Omit<IUserDTO, 'password'>;

export interface IUserDTOwithToken {
  user: UserWithoutPassword;
  token: string
}

export type LoginBody = Omit<IUserDTO, keyof Entity>;
