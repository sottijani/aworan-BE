import { Model, DataTypes } from "sequelize";
import sequelize from "../connection/db.config.js";

class Download extends Model {}
Download.init(
	{
		id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		img_id: { type: DataTypes.STRING, allowNull: false },
		deletedAt: { type: DataTypes.DATE, allowNull: true },
	},
	{ sequelize, modelName: "Download" }
);
export default Download;
