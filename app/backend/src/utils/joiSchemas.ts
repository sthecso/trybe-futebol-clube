import * as Joi from 'joi';

const emptyFieldMessage = 'All fields must be filled';

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Incorrect email or password',
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
  password: Joi.string().min(7).required().messages({
    'string.min': 'Password must be longer than 6 characters',
    'string.empty': emptyFieldMessage,
    'any.required': emptyFieldMessage,
  }),
});

export default loginUserSchema;
