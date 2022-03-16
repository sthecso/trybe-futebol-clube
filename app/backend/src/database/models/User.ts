import { DataTypes, Model } from 'sequelize';
import db from '.';


interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default class User extends Model<IUser> {}

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
