import { IEmailAndPasswordDTO } from './ILogin';

export default interface CRUD {
  getLogin: (value: IEmailAndPasswordDTO) => Promise<object>;
}
