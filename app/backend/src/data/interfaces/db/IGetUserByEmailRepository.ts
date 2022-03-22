import IUserAccount from '../../../domain/interfaces/IUserAccount';

interface IGetUserByEmailRepository {
  getByEmail(email: string): Promise<IUserAccount | null>
}

export default IGetUserByEmailRepository;
