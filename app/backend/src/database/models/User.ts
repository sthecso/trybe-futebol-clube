import { DataTypes, Model } from 'sequelize';
import db from '.';

interface UserAttributes {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'User',
    sequelize: db,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },
);
