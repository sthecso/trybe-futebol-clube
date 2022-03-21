const Matchs = (sequelize: any, DataTypes: any) => {
  const matchs = sequelize.define('Club', {
    id: DataTypes.INTEGER,
    home_team: DataTypes.INTEGER,
    home_team_goals: DataTypes.INTEGER,
    away_team: DataTypes.INTEGER,
    away_team_goals: DataTypes.INTEGER,
  });

  return matchs;
};

export default Matchs;
