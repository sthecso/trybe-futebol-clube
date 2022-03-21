const Club = (sequelize: any, DataTypes: any) => {
  const club = sequelize.define('Club', {
    id: DataTypes.INTEGER,
    club_name: DataTypes.STRING,
  });

  club.associate = (models: any) => {
    club.hasMany(
      models.Matchs,
      {
        foreignKey: 'home_team', as: 'home_team',
      },
      {
        foreignKey: 'away_team', as: 'away_team',
      },
    );
  };

  return club;
};

module.exports = Club;
