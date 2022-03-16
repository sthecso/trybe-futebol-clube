import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

class Clubs extends Model {
  declare id: number;

  declare clubName: string;

  declare clubId: string;

  static associate: (models: { Matchs: ModelStatic<Model<never, never>>; }) => void;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'clubName',
  },
  clubId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, timestamps: false, modelName: 'clubs', underscored: true });

Clubs.associate = (models) => {
  Clubs.hasMany(models.Matchs, { foreignKey: 'clubId', as: 'club' });
};
