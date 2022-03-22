import { IEmailAndPasswordDTO } from './ILogin';

export interface CRUDLogin {
  getLogin: (value: IEmailAndPasswordDTO) => Promise<object>;
}

export interface CRUDClub {
  getClubs: () => object
}
