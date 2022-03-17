import { Sequelize } from 'sequelize';
import User from './User';
import Club from './Club';
import Match from './Match';

const databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);
export { User, Match, Club }
