import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './match';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    field: 'club_name',
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'clubs',
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'clubHome' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'clubAway' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'matchHome' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'matchAway' });

export default Club;
