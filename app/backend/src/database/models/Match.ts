import { INTEGER, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

// Relacionamento 1:N

// ======= Club doa duas chaves para Match: homeTeam e awayTeam =======

// Club pertence a Match onde sua chave estrangeira é homeTeam que está no campo estrangeiro 'match'
Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });

// Club pertence a Match onde sua chave estrangeira é awayTeam que está no campo estrangeiro 'match'
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match' });

// ======= Match recebe duas chaves de Club: homeTeam e awayTeam =======

// Match recebe muitas chaves de Club, e suas chaves estrangeiras recebidas são: homeTeam e awayTeam que está no campo estrangeiro 'club'
Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'club' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'club' });

export default Match;
