import { Model, DataTypes } from "sequelize";
import sequelize from "../connection/db.config.js";

class Upload extends Model {}
Upload.init(
	{
		id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		img_url: { type: DataTypes.STRING, allowNull: false },
		total_downloads: { type: DataTypes.STRING },
		approved: { type: DataTypes.BIGINT, defaultValue: false },
		deletedAt: { type: DataTypes.DATE, allowNull: true },
	},
	{ sequelize, modelName: "User" }
);
export default Upload;
