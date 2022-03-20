import * as Joi from 'joi';
import { match } from '../messages';

const create = Joi.object({
  homeTeam: Joi.number().positive().required().messages({
    'any.required': match.required,
    'number.positive': match.homeTeam.positive,
    'number.base': match.homeTeam.base,
  }),
  homeTeamGoals: Joi.number().positive().required().messages({
    'any.required': match.required,
    'number.positive': match.homeTeamGoals.positive,
    'number.base': match.homeTeamGoals.base,
  }),
  awayTeam: Joi.number().positive().required().messages({
    'any.required': match.required,
    'number.positive': match.awayTeam.positive,
    'number.base': match.awayTeam.base,
  }),
  awayTeamGoals: Joi.number().positive().required().messages({
    'any.required': match.required,
    'number.positive': match.awayTeamGoals.positive,
    'number.base': match.awayTeamGoals.base,
  }),
});

// const edit = Joi.object({
//   homeTeamGoals: Joi.number().positive().required().messages({
//     'any.required': match.required,
//     'number.positive': match.homeTeamGoals.positive,
//     'number.base': match.homeTeamGoals.base,
//   }),
//   awayTeamGoals: Joi.number().positive().required().messages({
//     'any.required': match.required,
//     'number.positive': match.awayTeamGoals.positive,
//     'number.base': match.awayTeamGoals.base,
//   }),
// });

export default create;
