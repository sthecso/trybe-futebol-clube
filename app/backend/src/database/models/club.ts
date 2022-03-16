import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Club extends Model {
  // public <campo>!: <tipo>;
}

Club.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  club_name: { type: DataTypes.STRING, allowNull: false },
  // ... Campos
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Club, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Club, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Club.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Club.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Club;
