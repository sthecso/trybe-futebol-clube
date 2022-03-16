import * as Joi from 'joi';
import { RequestHandler } from 'express';
import { getByEmail } from '../Services/User';
import Status from '../Enums/Codes';

const message = 'Incorrect email or password';

const UserBluePrint = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
    any: message,
  }),
  password: Joi.string().min(7).required().messages({
    'any.required': 'All fields must be filled',
    any: message,
  }),
});

const validateLogin:RequestHandler = async (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const validation = UserBluePrint.validate(body);
  if (validation.error) {
    return res.status(Status.unauthorized).json({ message: validation.error.message });
  }
  const user = await getByEmail(email);
  if (!user) {
    return res.status(Status.unauthorized).json({ message });
  }

  next();
};

export default validateLogin;
