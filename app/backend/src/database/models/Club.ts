import { Model, DataTypes, Sequelize, Options } from 'sequelize';
import * as databaseOptions from '../config/database';

const databaseConfig = databaseOptions as unknown as Options;
const db = new Sequelize(databaseConfig);

class Club extends Model {
  id: number;

  clubName: string;
}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'clubs',
    timestamps: false,
    sequelize: db,
    modelName: 'Club',
    underscored: true,
  },
);

export default Club;
