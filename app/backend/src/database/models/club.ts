import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './match';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

Club.hasMany(Club, { foreignKey: 'home_team', as: 'home_team' });
Club.hasMany(Club, { foreignKey: 'away_team', as: 'away_team' });

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'home_team' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'away_team' });
// belongsTo = pertence a
export default Club;
