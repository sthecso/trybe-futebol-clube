import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './match';

class Club extends Model {
  public club_name:string;
}

Club.init({
  club_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Club',
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'clubHome' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'clubAway' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'matchHome' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'matchAway' });

export default Club;
