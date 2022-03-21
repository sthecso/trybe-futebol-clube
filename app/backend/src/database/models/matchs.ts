import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model {}

Match.init(
  {
    homeTeam: DataTypes.NUMBER,
    homeTeam_goals: DataTypes.NUMBER,
    awayTeam: DataTypes.NUMBER,
    awayTeam_goals: DataTypes.NUMBER,
    inProgress: DataTypes.NUMBER,
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'matchs',
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Match;
