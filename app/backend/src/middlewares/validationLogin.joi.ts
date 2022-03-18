import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.invalid': 'Incorrect email or password',
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().min(6).required().messages({
    'any.invalid': 'Incorrect email or password',
    'any.required': 'All fields must be filled',
  }),
});

let code: number;

export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message) {
      code = 401;
    }

    const err = { message: error.message };

    return res.status(code).json(err);
  }

  next();
};
