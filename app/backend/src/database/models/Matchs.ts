import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model { }

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
Clubs.belongsTo(Matchs, { foreignKey: 'home_team', as: 'timeDaCasa' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Clubs.belongsTo(Matchs, { foreignKey: 'away_team', as: 'timeVisitante' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
Matchs.hasMany(Clubs, { foreignKey: 'home_team', as: 'golsTimeDaCasa' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
Matchs.hasMany(Clubs, { foreignKey: 'away_team', as: 'golsTimeVisitante' });

export default Matchs;
