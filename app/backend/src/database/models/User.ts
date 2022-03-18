import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'User',
    sequelize: db,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },
);
