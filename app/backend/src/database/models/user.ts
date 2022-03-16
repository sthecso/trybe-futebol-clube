import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public username: string;

  public role: string;

  public email: string;

  public password: string;
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'User',
  timestamps: false,
});

export default User;
