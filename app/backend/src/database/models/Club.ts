import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {}

Club.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
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
  timestamps: false,
  sequelize: db, // We need to pass the connection instance
  modelName: 'Club', // We need to choose the model name
});
