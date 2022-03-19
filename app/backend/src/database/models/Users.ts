import { DataTypes, Model } from 'sequelize';
import db from '.';

type UserAttributes = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
};

class User extends Model<UserAttributes> {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
