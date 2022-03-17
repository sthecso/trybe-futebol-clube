import { Model, INTEGER } from 'sequelize';
import db from '.';
import clubs from './clubs';

class matchs extends Model {
  public id: number;
  public home_team: number;
  public home_team_goals: number;
  public away_team: number;
  public away_team_goals: number;
}

matchs.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  home_team: {
    type: INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: INTEGER,
    allowNull: false,
  },
  away_team: {
    type: INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
clubs.belongsTo(matchs, { foreignKey: 'home_team', as: 'match'});
clubs.belongsTo(matchs, { foreignKey: 'away_team', as: 'match'});

matchs.hasMany(clubs, { foreignKey: 'home_team', as: 'clubs'});
matchs.hasMany(clubs, { foreignKey: 'away_team', as: 'clubs'});

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default matchs;