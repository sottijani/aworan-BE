"use strict";
import User from "../../models/User.js";
import helper from "../helpers.js";

const getUsers = async (req, res) => {
	try {
		const user = req.params.id ? req.params.id : res.socket.parser.incoming.user.userId;

		const allUsers =
			user && user !== "all"
				? await User.findOne({
						where: { deletedAt: null, id: user },
						attributes: helper.excludes,
				  })
				: await User.findAll({
						where: { deletedAt: null },
						attributes: helper.excludes,
				  });

		if (req.params.id && !allUsers)
			return res.status(404).json({
				"message": "user not found",
			});

		return res.status(200).json({
			"message": "user retrieved succesuly",
			"data": allUsers,
			"params": req.params.id,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			"message": error,
		});
	}
};

export default getUsers;
