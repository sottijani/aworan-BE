import { Model, DataTypes } from "sequelize";
import connect from "../config/db.config";

class Wallet extends Model {}
Wallet.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		creator_id: Sequelize.STRING,
		total_earnings: Sequelize.STRING,
		previous_balance: Sequelize.STRING,
		current_balance: Sequelize.STRING,
	},
	{ connect, modelName: "Wallet" }
);
export default Wallet;
