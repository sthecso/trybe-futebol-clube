import { Model, DataTypes } from 'sequelize';
import db from '.';
import matchsModel from './matchsModel';
// import OtherModel from './OtherModel';

class Clubs extends Model {
  public id: number;

  public club_name: string;
}

Clubs.init({
  club_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

Clubs.hasMany(matchsModel, { foreignKey: 'home_team', as: 'team1' });
Clubs.hasMany(matchsModel, { foreignKey: 'away_team', as: 'team2' });

matchsModel.belongsTo(Clubs, { foreignKey: 'id', as: 'team1' });
matchsModel.belongsTo(Clubs, { foreignKey: 'id', as: 'team2' });
/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Clubs;
