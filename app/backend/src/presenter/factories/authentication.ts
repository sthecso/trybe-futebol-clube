import BcryptjsAdapter from '../../infra/bcryptjs/bcryptjsAdapter';
import JwtAdapter from '../../infra/jwt/jwtAdapter';
import UserRepository from '../../infra/mysql/userRespository';
import DbAuthentication from '../../data/usecases/dbAuthentication';

const makeLoginAuthentication = () => {
  const userRepository = new UserRepository();
  const hashComparer = new BcryptjsAdapter();
  const encrypter = new JwtAdapter('super_senha');

  return new DbAuthentication(userRepository, hashComparer, encrypter);
};

export default makeLoginAuthentication;
