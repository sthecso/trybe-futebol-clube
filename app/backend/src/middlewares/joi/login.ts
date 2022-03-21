import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message.includes('filled')) return res.status(401).json({ message: error.message });
    return res.status(422).json({ message: error.message });
  }

  next();
};
