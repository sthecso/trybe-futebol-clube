import { DataTypes, Model } from 'sequelize';
import db from '.';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  clubName: { type: DataTypes.STRING },
}, { underscored: true, sequelize: db, timestamps: false, modelName: 'Clubs', tableName: 'clubs' });

export default Clubs;
