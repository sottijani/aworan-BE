import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

class Role extends Model {}
Role.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		role_title: { type: DataTypes.STRING },
	},
	{ sequelize, modelName: "Role" }
);
export default Role;
