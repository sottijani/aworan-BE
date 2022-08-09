import { Model, DataTypes } from "sequelize";
import sequelize from "../connection/db.config.js";

class User extends Model {}
User.init(
	{
		id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
		first_name: { type: DataTypes.STRING },
		last_name: { type: DataTypes.STRING },
		email: { type: DataTypes.STRING },
		phone: { type: DataTypes.STRING },
		user_type_id: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING },
		deletedAt: { type: DataTypes.STRING, allowNull: true },
	},
	{ sequelize, modelName: "User" }
);
export default User;
