import { DataTypes, Model } from 'sequelize';
import Matchs from './Match';
import db from '.';

class Clubs extends Model {}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'club_name',
  },
}, { sequelize: db, timestamps: false, modelName: 'clubs', underscored: true });

Clubs.hasOne(Matchs, {
  foreignKey: 'home_team',
  as: 'club a',
});

Clubs.hasOne(Matchs, {
  foreignKey: 'away_team',
  as: 'club b',
});

Matchs.belongsTo(Clubs, {
  foreignKey: 'home_team',
  as: 'homeClub',
});

Matchs.belongsTo(Clubs, {
  foreignKey: 'away_team',
  as: 'awayClub',
});

export default Clubs;
