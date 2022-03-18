import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  username: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

let code: number;

export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message) {
      code = 400;
    }

    const err = { error: error.message };

    return res.status(code).json(err);
  }

  next();
};
