import * as Joi from 'joi';
import { RequestHandler } from 'express';
import { getByEmail } from '../Services/User';
import Status from '../Enums/Codes';

const UserBluePrint = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const validateLogin:RequestHandler = async (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const validation = UserBluePrint.validate(body);
  if (validation.error) {
    return res.status(Status.badRequest).json({ error: validation.error.message });
  }
  const user = await getByEmail(email);
  if (!user) {
    return res.status(Status.unauthorized).json({ error: 'Email or password invalid' });
  }

  next();
};

export default validateLogin;
