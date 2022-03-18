import * as Joi from 'joi';

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Incorrect email or password',
    'string.empty': 'All fields must be filled',
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().min(7).required().messages({
    'string.min': 'Password must be longer than 6 characters',
    'string.empty': 'All fields must be filled',
    'any.required': 'All fields must be filled',
  }),
});

export default loginUserSchema;
