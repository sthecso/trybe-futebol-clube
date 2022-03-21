import { Model, DataTypes } from 'sequelize';
import Club from './club';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model {}

Match.init(
  {
    homeTeam: DataTypes.NUMBER,
    homeTeamGoals: DataTypes.NUMBER,
    awayTeam: DataTypes.NUMBER,
    awayTeamGoals: DataTypes.NUMBER,
    inProgress: DataTypes.BOOLEAN,
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

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;
