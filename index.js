import express, { json } from "express";
import cors from "cors";
import connect from "./src/config/db.config.js";
import routes from "./src/config/routes.js";
import compression from "compression";
const PORT = 5000;
const app = express();
app.use(compression);

app.use(json());
app.use(cors({ origin: "*" }));

connect.sync();
routes(app);

app.listen(PORT, () => console.log("app is listening to port " + PORT));
