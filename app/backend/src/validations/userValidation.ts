import Joi = require('joi');
import User from '../interfaces/userInterfaces';
import runSchema from './validations';

export default {
  bodyLogin: runSchema<User>(Joi.object<User>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })),
};
