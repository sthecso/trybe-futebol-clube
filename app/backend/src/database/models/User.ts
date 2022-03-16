import { DataTypes, Model } from "sequelize";
import db from ".";

class User extends Model {
    public id: number;
    public username: string;
    public role: string;
    public email: string;
    public password: string;
}
User.init(
  {
    id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
