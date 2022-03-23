import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
});

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    switch (type) {
      case 'any.required':
        return res.status(401).json({ error: message });
      default:
        return res.status(422).json({ error: message });
    }
  }
  next();
};
