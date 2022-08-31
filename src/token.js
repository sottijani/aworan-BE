"use strict";
// @ts-check
import jwt from "jsonwebtoken";

/**
 * @returns {string}
 */
export const accessToken = (user) => {
	return jwt.sign(user, "token", { expiresIn: "1hr" });
};

export const authenticate = (req, res, next) => {
	const auth = req.headers["authorization"];
	const token = auth && auth.split(" ")[1];
	console.log(token);
	if (!token)
		return res.status(401).json({
			"message": "Unauthorized",
		});
	jwt.verify(token, "token", (err, user) => {
		if (err) {
			console.log(err);
			return res.status(403).json({
				"message": err.message,
			});
		} else {
			req.user = user;
			// console.log(res)
			next();
		}
	});
};
