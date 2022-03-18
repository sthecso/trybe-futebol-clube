import * as Joi from 'joi';
import { user } from '../messages';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': user.required,
    'string.base': user.email.base,
  }),
  password: Joi.string().required().messages({
    'any.required': user.required,
    'string.base': user.password.base,
  }),
});

export default loginSchema;
