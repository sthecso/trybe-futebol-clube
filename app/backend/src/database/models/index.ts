import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);

export { default as User } from './User';
export { default as Club } from './Clubs';
export { default as Match } from './Matchs';
