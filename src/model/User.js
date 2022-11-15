import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

class User extends Model {}

User.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		email: DataTypes.STRING,
		phone: { type: DataTypes.STRING, allowNull: true },
		password: { type: DataTypes.STRING },
		primary_role: { type: DataTypes.STRING },
		sub_date: { type: DataTypes.DATE, allowNull: true },
		sub_status: { type: DataTypes.BOOLEAN, defaultValue: false },
		twitter: DataTypes.STRING,
		instagram: DataTypes.STRING,
	},
	{ sequelize, tableName: "users", paranoid: true }
);
export default User;
