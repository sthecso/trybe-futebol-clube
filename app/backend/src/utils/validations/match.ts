import * as Joi from 'joi';
import { match } from '../messages';

const create = Joi.object({
  homeTeam: Joi.number().required().messages({
    'any.required': match.required,
    'string.base': match.homeTeam.base,
  }),
  homeTeamGoals: Joi.number().required().messages({
    'any.required': match.required,
    'string.base': match.homeTeamGoals.base,
  }),
  awayTeam: Joi.number().required().messages({
    'any.required': match.required,
    'string.base': match.awayTeam.base,
  }),
  awayTeamGoals: Joi.number().required().messages({
    'any.required': match.required,
    'string.base': match.awayTeamGoals.base,
  }),
  inProgress: Joi.boolean().required().messages({
    'any.required': match.required,
    'string.base': match.inProgress.base,
  }),
});

const edit = Joi.object({
  homeTeamGoals: Joi.number().required().messages({
    'any.required': match.required,
    'string.base': match.homeTeamGoals.base,
  }),
  awayTeamGoals: Joi.number().required().messages({
    'any.required': match.required,
    'string.base': match.awayTeamGoals.base,
  }),
});

export { create, edit };
