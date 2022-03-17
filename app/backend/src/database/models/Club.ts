import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';
// import OtherModel from './OtherModel';

class Club extends Model {
  // public <campo>!: <tipo>;
  public id: number;

  public clubName: string;
}

Club.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match' });

Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'awayTeam' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Club;
