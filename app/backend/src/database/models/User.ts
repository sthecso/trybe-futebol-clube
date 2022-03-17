import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
});
