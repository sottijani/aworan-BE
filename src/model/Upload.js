import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Bookmark from "./Bookmark.js";

class Upload extends Model {}
Upload.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		img_url: DataTypes.STRING,
		creator_id: DataTypes.STRING,
		total_downloads: { type: DataTypes.STRING, defaultValue: 0 },
		total_bookmark: { type: DataTypes.STRING, defaultValue: 0 },
		tags: DataTypes.STRING,
		title: DataTypes.STRING,
		category: DataTypes.STRING,
		total_view: DataTypes.STRING,
	},
	{ sequelize, modelName: "Upload", paranoid: true }
);

export default Upload;
