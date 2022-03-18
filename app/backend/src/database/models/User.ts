import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, { sequelize: db, timestamps: false, modelName: 'user' });

export default User;
