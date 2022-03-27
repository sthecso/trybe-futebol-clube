import * as Joi from 'joi';

const validateLogin: Joi.Schema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'All fields must be filled',
  }),
});

const schemaBase = (schema: Joi.Schema, body: object) => {
  const { error } = schema.validate(body);
  if (error) throw error;
};

export {
  validateLogin,
  schemaBase,
};
