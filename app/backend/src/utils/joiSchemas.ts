import Joi = require('joi');
import IUserDTO from '../interfaces';

const loginSchema = Joi.object<IUserDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default loginSchema;
