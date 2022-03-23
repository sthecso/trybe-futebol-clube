import * as Joi from 'joi';

const ERROR_MESSAGE = 'All fields must be filled';

const schema: Joi.Schema = Joi.object({
  homeTeam: Joi.number().required().messages({
    'any.required': ERROR_MESSAGE,
    'number.empty': ERROR_MESSAGE,
  }),
  awayTeam: Joi.number().required().messages({
    'any.required': ERROR_MESSAGE,
    'number.empty': ERROR_MESSAGE,
  }),
  homeGoals: Joi.number().required().messages({
    'any.required': ERROR_MESSAGE,
    'number.empty': ERROR_MESSAGE,
  }),
  awayGoals: Joi.number().required().messages({
    'any.required': ERROR_MESSAGE,
    'number.empty': ERROR_MESSAGE,
  }),
});

export default schema;
