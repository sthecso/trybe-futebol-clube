import IUserRes from './IUserRes';

interface ILoginRes {
  user: IUserRes;
  token: string;
}

export default ILoginRes;
