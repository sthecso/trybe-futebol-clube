import { Model, STRING, NUMBER } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class users extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

users.init({
  id: {
    type: NUMBER
  },
  username: {
    type: STRING
  },
  role: {
    type: STRING
  },
  email: {
    type: STRING
  },
  password: {
    type: STRING
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
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

export default users;