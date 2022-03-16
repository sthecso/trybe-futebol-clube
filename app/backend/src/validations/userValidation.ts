import Joi = require('joi');
import runSchema from './validations';

export default {
  bodyLogin: runSchema(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })),
};
