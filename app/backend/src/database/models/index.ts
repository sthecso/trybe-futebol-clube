import { Sequelize } from 'sequelize';

import databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);
