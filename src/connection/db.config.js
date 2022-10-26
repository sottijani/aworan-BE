import Sequelize from "sequelize";
const option = {
	host: "sql11.freesqldatabase.com",
	dialect: "mysql",
	port: 3306,
	pool: {
		max: 30,
		min: 0,
	},
};

const sequelize = new Sequelize("sql11529401", "sql11529401", "v2fffXzeZD", option);
try {
	await sequelize.authenticate();
	console.log("connection successful");
} catch (error) {
	console.log(error);
}
// // const option = {
// // 	host: "localhost",
// // 	dialect: "mysql",
// // 	// port: "3306",
// // };

// // const sequelize = new Sequelize("photo-op", "root", "root", option);
// // try {
// // 	await sequelize.authenticate();
// // 	console.log("connection successful");
// // } catch (error) {
// // 	console.log(error);
// // }
export default sequelize;
