import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

class User extends Model {}

User.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		first_name: { type: DataTypes.STRING },
		last_name: { type: DataTypes.STRING },
		email: { type: DataTypes.STRING },
		phone: { type: DataTypes.STRING, allowNull: true },
		password: { type: DataTypes.STRING },
		primary_role: { type: DataTypes.STRING },
		sub_date: { type: DataTypes.DATE, allowNull: true },
		sub_status: { type: DataTypes.BOOLEAN, defaultValue: false },
		deletedAt: { type: DataTypes.STRING, allowNull: true },
	},
	{ sequelize, tableName: "users" }
);
export default User;
