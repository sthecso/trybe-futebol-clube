import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Club extends Model { }

Club.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
  timestamps: false,
  sequelize: db, // We need to pass the connection instance
  modelName: 'clubs', // We need to choose the model name
});
