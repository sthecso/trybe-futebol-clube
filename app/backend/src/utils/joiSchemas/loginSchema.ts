import Joi = require('joi');
import { LoginBody } from '../../interfaces/IUserDTO';

const loginSchema = Joi.object<LoginBody>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default loginSchema;
