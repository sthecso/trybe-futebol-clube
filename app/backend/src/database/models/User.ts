import { Model, Sequelize, DataTypes, Options } from 'sequelize';
import * as databaseOptions from '../config/database';

const databaseConfig = databaseOptions as unknown as Options;
const db = new Sequelize(databaseConfig);

class User extends Model {
  id: number;

  username: string;

  role: string;

  email: string;

  password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize: db,
    modelName: 'User',
    underscored: true,
  },
);

export default User;
