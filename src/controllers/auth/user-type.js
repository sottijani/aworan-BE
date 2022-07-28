"use strict";
// @ts-check

import UserType from "../../models/UserType.js";

const userType = async (req, res) => {
	try {
		await UserType.create({ user_type: req.body.user_type });
		return res.status(201).json({ "message": "user type create successfuly" });
	} catch (error) {
		return res.status(500).json({ "message": error });
	}
};

export default userType;
