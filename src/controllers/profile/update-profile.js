"use strict";
import User from "../../models/User.js";
import helper from "../helpers.js";

const upateProfile = async (req, res) => {
	let body = req.body;
	try {
		const userId = res.socket.parser.incoming.user.userId;
		const user = User.findOne({
			where: { id: userId, deletedAt: null },
		});
		if (req.params.phrase && req.params.phrase !== "password") {
			throw "Invalid url";
		}

		if (body.password && body.old_password) {
			const checkPassword = helper.decryptext(req.body.password, user.password);
			if (!checkPassword)
				return res.status(419).json({
					"message": "update successful",
				});
		}

		if (body.password && req.params.phrase && req.params.phrase === "password") {
			body = helper.delete(body, "password").initV;
			const saltRound = 10;

			const password = await bcrypt.hash(body.password.toString(), saltRound);
			console.log(password);
			body["password"] = password;
		} else {
			body = helper.delete(body, "password").rest;
		}

		await User.update(body, { where: { id: userId } });

		return res.status(200).json({
			"message": "update successful",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ "message": error });
	}
};

export default upateProfile;
