import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model {
  // public <campo>!: <tipo>;
}

Match.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  home_team: { type: DataTypes.INTEGER },
  home_team_goals: { type: DataTypes.INTEGER },
  away_team: { type: DataTypes.INTEGER },
  away_team_goals: { type: DataTypes.INTEGER },
  in_progress: { type: DataTypes.INTEGER },
  // ... Campos
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Match, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Match, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Match.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Match.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Match;
