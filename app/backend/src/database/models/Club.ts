import { DataTypes, Model } from 'sequelize';
import db from '.';

class Clubs extends Model {}

Clubs.init({
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
  modelName: 'Clubs', // We need to choose the model name
});
