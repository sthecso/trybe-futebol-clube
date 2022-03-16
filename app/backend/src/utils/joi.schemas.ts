import * as Joi from 'joi';

export const login = Joi.object({
  email: Joi.string().required().email().messages({
    'string.base': '422|Email must be a string',
    'string.email': '422|Email must be a valid email address',
    'string.empty': '400|Email is not allowed to be empty',
    'any.required': '401|All fields must be filled',
  }),
  password: Joi.string().required().messages({
    'string.base': '422|Password must be a string',
    'string.empty': '400|Password is not allowed to be empty',
    'any.required': '401|All fields must be filled',
  }),
});

export const lint = 'chato';
