import { Model, DataTypes } from "sequelize";
import sequelize from "../connection/db.config.js";

class UserType extends Model {}
UserType.init(
	{
		id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
		user_type: { type: DataTypes.STRING },
		deletedAt: { type: DataTypes.DATE, allowNull: true },
	},
	{ sequelize, modelName: "UserType" }
);
export default UserType;
