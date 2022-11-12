import { Model, DataTypes } from "sequelize";
import connect from "../config/db.config";

class Upload extends Model {}
Upload.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		img_url: Sequelize.STRING,
		creator_id: Sequelize.STRING,
		total_downloads: Sequelize.STRING,
		total_bookmark: Sequelize.STRING,
		total_view: Sequelize.STRING,
		deletedAt: { allowNull: true, type: Sequelize.DATE },
	},
	{ connect, modelName: "Upload" }
);
export default Upload;
