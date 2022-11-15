import Sequelize from "sequelize";

const option = {
	host: "localhost",
	dialect: "mysql",
	port: 8889,
};

const sequelize = new Sequelize("aworan", "root", "root", option);

try {
	await sequelize.authenticate();
	console.log("connected");
} catch (error) {
	console.log(error);
}

export default sequelize;
