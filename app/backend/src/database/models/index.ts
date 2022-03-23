import { Sequelize, Options } from 'sequelize';
import * as databaseOptions from '../config/database';
import User from './User';
import Club from './Club';
import Match from './Match';

const databaseConfig = databaseOptions as unknown as Options;
const sequelize = new Sequelize(databaseConfig);

export {
  Sequelize,
  sequelize,
  User,
  Club,
  Match,
};
