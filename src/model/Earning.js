import { Model, DataTypes } from "sequelize";
import connect from "../config/db.config";

class Earning extends Model {}
Earning.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		creator_id: Sequelize.STRING,
		amount: Sequelize.STRING,
		phone: { type: DataTypes.STRING, allowNull: true },
	},
	{ connect, modelName: "Earning" }
);
export default Earning;
