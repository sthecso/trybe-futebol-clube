import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './matchs';
// import OtherModel from './OtherModel';

class Club extends Model {}

Club.init(
  {
    clubName: DataTypes.STRING,
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'clubs',
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Club.hasOne(Match, { foreignKey: 'home_team' });
Club.hasOne(Match, { foreignKey: 'away_team' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Club;
