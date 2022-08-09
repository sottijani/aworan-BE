"use strict";
import User from "../../models/User.js";
import * as bcrypt from "bcrypt";
import helper from "../helpers.js";

const upateProfile = async (req, res) => {
	console.log(req.body);
	let body = req.body;
	console.log(body);
	try {
		if (req.params.phrase && req.params.phrase !== "password") {
			throw "Invalid url";
			return;
		}
		if (body.password && req.params.phrase && req.params.phrase === "password") {
			body = helper.delete(body, "password").initV; //deleteObj(body, "password").initV;
			const saltRound = 10;
			const password = await bcrypt.hash(body.password.toString(), saltRound);
			console.log(password);
			body["password"] = password;
		} else {
			console.log(body);
			body = helper.delete(body, "password").rest;
		}

		const user = res.socket.parser.incoming.user.userId;

		// console.log(user);
		await User.update(body, { where: { id: user } });

		return res.status(200).json({
			"message": "update successful",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ "message": error });
	}
};

export default upateProfile;
