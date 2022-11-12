import { Model, DataTypes } from "sequelize";
import connect from "../config/db.config";

class Download extends Model {}
Download.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		img_id: { type: DataTypes.STRING },
		creator_id: { type: DataTypes.STRING },
		user_id: { type: DataTypes.STRING },
		phone: { type: DataTypes.STRING, allowNull: true },
	},
	{ connect, modelName: "Download" }
);
export default Download;
