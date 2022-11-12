import { Model, DataTypes } from "sequelize";
import connect from "../config/db.config";

class Bookmark extends Model {}
Bookmark.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		user_id: DataTypes.STRING,
		creator_id: DataTypes.STRING,
		img_url: DataTypes.STRING,
		phone: { type: DataTypes.STRING, allowNull: true },
		deletedAt: DataTypes.DATE,
	},
	{ connect, modelName: "Bookmark" }
);
export default Bookmark;
