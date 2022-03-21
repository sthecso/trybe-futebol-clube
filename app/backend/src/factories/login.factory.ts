import { compare } from 'bcryptjs';
import { LoginService } from '../services';
import { UsersRepository } from '../repositories';
import { jwtGenerator } from '../helpers';

export const loginFactory = () => new LoginService(new UsersRepository(), compare, jwtGenerator);
