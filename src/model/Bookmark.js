import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Upload from "./Upload.js";

class Bookmark extends Model {}
Bookmark.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		user_id: DataTypes.STRING,
		creator_id: DataTypes.STRING,
		img_url: DataTypes.STRING,
	},
	{ sequelize, modelName: "Bookmark", paranoid: true }
);

export default Bookmark;
