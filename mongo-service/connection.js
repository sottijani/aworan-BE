import mongo from "mongoose";
import ev from "dotenv";

ev.config();
const uri = process.env.DATABASE_URL;
mongo.connect(uri);
const database = mongo.connection;

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("Database Connected");
});

export default database;
