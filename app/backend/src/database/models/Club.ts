import { DataTypes, Model } from 'sequelize';
import db from '.';

class Clubs extends Model {
  declare id: number;

  declare clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize: db, timestamps: false, modelName: 'clubs', underscored: true });

export default Clubs;
