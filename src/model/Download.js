import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

class Download extends Model {}
Download.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		img_id: { type: DataTypes.STRING },
		img_url: { type: DataTypes.STRING },
		creator_id: { type: DataTypes.STRING },
		user_id: { type: DataTypes.STRING },
		phone: { type: DataTypes.STRING, allowNull: true },
	},
	{ sequelize, modelName: "Download" }
);
export default Download;
