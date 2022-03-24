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
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize: db, timestamps: false, modelName: 'clubs', underscored: true });

Clubs.hasOne(Matchs, {
  as: 'club a',
  foreignKey: 'home_team',
});

Clubs.hasOne(Matchs, {
  as: 'club b',
  foreignKey: 'away_team',
});

Matchs.belongsTo(Clubs, { as: 'homeClub', foreignKey: 'home_team' });

Matchs.belongsTo(Clubs, { as: 'awayClub', foreignKey: 'away_team' });

export default Clubs;
