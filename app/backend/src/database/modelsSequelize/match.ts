import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './club';
// import OtherModel from './OtherModel';

class Match extends Model {
  // public <campo>!: <tipo>;
}

Match.init({
  // ... Campo
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClube' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;
