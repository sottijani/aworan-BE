"use strict";
// @ts-check

const verifyEmail = (req, res) => {
	return res.status(200).json(req.body);
};

export default verifyEmail;
