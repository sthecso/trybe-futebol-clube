import * as Joi from 'joi';

const errorField = 'All fields must be filled';

const errorPositve = 'All fields must be positive';

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

const matchSchema = Joi.object({
  homeTeam: Joi.number().required().positive().messages({
    'number.base': 'homeTeam must be a number',
    'number.positive': errorPositve,
    'any.required': errorField,
  }),
  awayTeam: Joi.number().required().positive().messages({
    'number.base': 'awayTeam must be a number',
    'number.positive': errorPositve,
    'any.required': errorField,
  }),
  homeTeamGoals: Joi.number().required().positive().messages({
    'number.base': 'homeTeamGoals must be a number',
    'number.positive': errorPositve,
    'any.required': errorField,
  }),
  awayTeamGoals: Joi.number().required().positive().messages({
    'number.base': 'awayTeamGoals must be a number',
    'number.positive': errorPositve,
    'any.required': errorField,
  }),
  inProgress: Joi.boolean().invalid(false).required().messages({
    'boolean.base': 'inProgress must be a boolean',
    'any.invalid': 'inProgress must be true',
    'any.required': errorField,
  }),
});

const matchGoalsSchema = Joi.object({
  homeTeamGoals: Joi.number().required().positive().messages({
    'number.base': 'homeTeamGoals must be a number',
    'number.positive': errorPositve,
    'any.required': errorField,
  }),
  awayTeamGoals: Joi.number().required().positive().messages({
    'number.base': 'awayTeamGoals must be a number',
    'number.positive': errorPositve,
    'any.required': errorField,
  }),
});

export { loginSchema, matchSchema, matchGoalsSchema };
