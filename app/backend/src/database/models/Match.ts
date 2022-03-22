import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  // public <campo>!: <tipo>;
  id: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: number;
}

Match.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'mH' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'mA' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'cH' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'cA' });

export default Match;
