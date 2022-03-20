import * as Joi from 'joi';

const errorField = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': errorField,
    'any.required': errorField,
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': errorField,
    'any.required': errorField,
  }),
});

export default loginSchema;
