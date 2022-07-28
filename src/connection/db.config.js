import Sequelize from "sequelize";
const option = {
	HOST: "localhost",
	dialect: "mysql",
};

const sequelize =  new Sequelize("photo-op", "root","root",  option)
try {
await sequelize.authenticate()
	console.log("connection successful")
} catch (error) {
	console.log(error)
}
export default sequelize


