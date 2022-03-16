import * as Joi from 'joi';
import { RequestHandler } from 'express';
import Status from '../Enums/Codes';

const message = 'Incorrect email or password';
const message2 = 'All fields must be filled';

const UserBluePrint = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': message2,
    'string.empty': message,
    'string.email': message,
    any: message,
  }),
  password: Joi.string().min(7).required().messages({
    'any.required': message2,
    'string.empty': message,
    'string.min': message,
    any: message,
  }),
});

const validateLogin:RequestHandler = async (req, res, next) => {
  console.log('validando');

  const { body } = req;
  const validation = UserBluePrint.validate(body);
  if (validation.error) {
    return res.status(Status.unauthorized).json({ message: validation.error.message });
  }

  next();
};

export default validateLogin;
