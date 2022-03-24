import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const MESSAGE_FIELD = 'All fields must be filled';

const schema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': MESSAGE_FIELD,
    'string.empty': MESSAGE_FIELD,
  }),
  password: Joi.string().min(6).required()
    .messages({
      'any.required': MESSAGE_FIELD,
      'string.empty': MESSAGE_FIELD,
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
