"use strict";
// @ts-check

import User from "../../models/User.js";
import { accessToken } from "../../token.js";
import helper from "../helpers.js";

const signUp = async (req, res) => {
	try {
		if (!helper.validatemaail(req.body.email))
			return res.status(403).json({
				"message": "invalid email",
			});

		const getUser = await User.findOne({
			where: { "email": req.body.email },
		});

		// console.log(getUser);
		if (getUser) {
			return res.status(409).json({
				"message": "User already exist",
			});
		}

		const password = await helper.encryptPassword(req.body.password);
		const user = await User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: password,
			user_type_id: "1",
		});

		const token = accessToken({
			userId: user.id,
			email: user.email,
		});
		return res.status(201).json({
			"message": "user created successfully",
			"token": token,
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).json({
			"message": error,
		});
	}
};

export default signUp;
