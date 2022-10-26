import express, { json } from "express";
import sequelize from "./src/connection/db.config.js";
import routes from "./src/routes.js";
import cors from "cors";
// import database from "./mongo-service/connection.js";
const PORT = 4000;
const app = express();
app.use(json());
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
// database;
sequelize.sync();
// routes(app);

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
