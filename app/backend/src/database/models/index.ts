import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);

export { default as ClubsModel } from './Club';
export { default as MatchsModel } from './Match';
export { default as UsersModel } from './User';