import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

class Upload extends Model {}
Upload.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		img_url: DataTypes.STRING,
		creator_id: DataTypes.STRING,
		total_downloads: DataTypes.STRING,
		total_bookmark: DataTypes.STRING,
		tags: DataTypes.STRING,
		title: DataTypes.STRING,
		category: DataTypes.STRING,
		total_view: DataTypes.STRING,
		deletedAt: { allowNull: true, type: DataTypes.DATE },
	},
	{ sequelize, modelName: "Upload" }
);
export default Upload;
