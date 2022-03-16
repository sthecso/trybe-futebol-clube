import * as Joi from 'joi';

const FIELD_REQUIRED_MESSAGE = 'All fields must be filled';

export const schemaUserRequest = Joi.object({
  email: Joi.string().required().messages({
    'string.base': '"email" must be a string',
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'any.required': FIELD_REQUIRED_MESSAGE,
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': '"password" must be a number larger than or equal to 6',
    'string.min': '"password" must be a number larger than or equal to 6',
    'string.empty': FIELD_REQUIRED_MESSAGE,
    'any.required': FIELD_REQUIRED_MESSAGE,
  }),
});

export const lint = () => {};
