import Sequelize from "sequelize"

const option = {
  host: "afrilens.com.ng",
  dialect: "mysql",
  port: 3306
}

// const sequelize = new Sequelize("afrilens_beta", "afrilens_victor", "Bullyvax2022", option)

const sequelize = new Sequelize("afrilens_beta", "afrilens_victor", "Bullyvax2022", option)
try {
  await sequelize.authenticate()
  console.log("connected")
} catch (error) {
  console.log(error)
}

export default sequelize

// username: afrilens_victor
// password: Bullyvax2022
