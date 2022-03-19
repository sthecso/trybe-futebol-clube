import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    validate: {
      notNull: { msg: '"email" is required' },
      notEmpty: { msg: '"email" is required' },
      isEmail: { msg: '"email" must be a valid email' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: '"password" is required' },
      notEmpty: { msg: '"password" is required' },
      isEven(value: string) {
        if (!value || value.length !== 6) {
          throw new Error('"password" length must be 6 characters long');
        }
      },
    },
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default User;
