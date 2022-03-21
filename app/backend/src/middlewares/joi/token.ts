import { Response } from 'express';
import * as Joi from 'joi';
import { Authorization } from '../../interfaces';

const message = 'Token not found';

const schema = Joi.object({
  authorization: Joi.string().min(1).empty().required()
    .messages({
      'any.required': message,
      'string.empty': message,
      'string.min': message,
    }),
});

export default (body: Authorization | string, res: Response) => {
  const { error } = schema.validate(body);

  if (error) return res.status(404).json({ message: error.message });

  return true;
};
