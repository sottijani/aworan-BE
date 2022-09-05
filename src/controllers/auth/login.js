"use strict";
// @ts-check

import User from "../../models/User.js";
import { accessToken } from "../../token.js";
import helper from "../helpers.js";

const login = async (req, res) => {
	let pass = "";
	try {
		const user = await User.findOne({
			where: { email: req.body.email, deletedAt: null },
		});
		if (user) pass = await helper.decryptext(req.body.password, user.password);

		if (pass) {
			const token = accessToken({
				userId: user.id,
				email: user.email,
			});
			return res.status(200).json({
				"message": "user profile",
				"token": token,
			});
		}
		return res.status(404).json({
			"message": "incorrect email or password",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			"message": error,
		});
	}
};

export default login;
