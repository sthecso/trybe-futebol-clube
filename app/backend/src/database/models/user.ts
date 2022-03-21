const Users = (sequelize: any, DataTypes: any) => {
  const users = sequelize.define('Club', {
    id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return users;
};

module.exports = Users;
