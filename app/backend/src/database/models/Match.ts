import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

class Matchs extends Model {
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;

  static associate: (models: { Clubs: ModelStatic<Model<never, never>>; }) => void;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  home_team: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'homeTeam',
  },
  home_team_goals: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'HomeTeamGoals',
  },
  away_team: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'awayTeam',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, { sequelize, timestamps: false, modelName: 'matchs', underscored: true });

Matchs.associate = (models) => {
  Matchs.belongsTo(models.Clubs, { foreignKey: 'clubId', as: 'match' });
};
