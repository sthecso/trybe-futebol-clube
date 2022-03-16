import * as Joi from 'joi';

const error = '401|All fields must be filled';

export const login = Joi.object({
  email: Joi.string().required().messages({
    'string.base': '422|Email must be a string',
    'string.empty': error,
    'any.required': error,
  }),
  password: Joi.string().required().messages({
    'string.base': '422|Password must be a string',
    'string.empty': error,
    'any.required': error,
  }),
});

export const lint = 'chato';
