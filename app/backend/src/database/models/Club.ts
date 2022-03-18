import { DataTypes, Model } from 'sequelize';
import db from '.';
import { IClub } from '../../interfaces/Club';

export default class Club extends Model<IClub> {}

Club.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Club',
    sequelize: db,
    tableName: 'clubs',
    timestamps: false,
    underscored: true,
  },
);
