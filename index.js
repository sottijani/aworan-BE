import express, { json } from "express";
import sequelize from "./src/connection/db.config.js";
import routes from "./src/routes.js";


const PORT = 3000;
const app = express();
app.use(json())
app.use(express.static('public'))

sequelize.sync()
routes(app)

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
