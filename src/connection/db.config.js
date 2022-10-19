import Sequelize from "sequelize";
const option = {
	host: "sql8.freesqldatabase.com",
	dialect: "mysql",
	port: "3306",
};

const sequelize = new Sequelize("sql8526824", "sql8526824", "MXKXvEa6L7", option);
try {
	await sequelize.authenticate();
	console.log("connection successful");
} catch (error) {
	console.log(error);
}
export default sequelize;
