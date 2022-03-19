import * as Joi from 'joi';

const ERROR_MESSAGE = 'All fields must be filled';

const schema: Joi.Schema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'any.required': ERROR_MESSAGE,
      'string.empty': ERROR_MESSAGE,
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
      'any.required': ERROR_MESSAGE,
      'string.empty': ERROR_MESSAGE,
    }),
});

export default schema;
