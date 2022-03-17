import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': '422|Password must be a string',
    'string.empty': 'Password is empty',
    'any.required': 'Password is required',
  }),
});

export default loginSchema;
