import { Sequelize } from 'sequelize';
import UserModel from './User';
import ClubModel from './Club';
import MatchModel from './Match';

const databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);

export {UserModel, ClubModel, MatchModel};


