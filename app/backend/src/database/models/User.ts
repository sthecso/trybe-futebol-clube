import { DataTypes, Model } from 'sequelize';
import { IUserDTO } from '../../interfaces/IUserDTO';
import db from '.';

export default class User extends Model<IUserDTO> {}

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
