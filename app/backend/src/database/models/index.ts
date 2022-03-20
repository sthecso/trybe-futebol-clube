import { Sequelize } from 'sequelize';
import User from './User';
import Club from './Club';
import Match from './Match';

const databaseConfig = require('../config/database');

export {
  User,
  Club,
  Match,
};

export default new Sequelize(databaseConfig);
