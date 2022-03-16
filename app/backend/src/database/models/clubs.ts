/* const clubs = (sequelize, DataTypes) => {
  const clubs = sequelize.define("clubs", {
    club_name: DataTypes.STRING,
  });

  return clubs;
};

module.exports = clubs; */

import { Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class clubs extends Model {
  public club_name!: string;
}

clubs.init({
  club_name: 'Cruzeiro'
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default clubs;