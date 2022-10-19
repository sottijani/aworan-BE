"use strict";
import Upload from "../../models/Upload.js";
import User from "../../models/User.js";
import helper from "../helpers.js";

User.hasMany(Upload, { as: "uploads", foreignKey: "user_id" });

const getUsers = async (req, res) => {
	try {
		const user = req.params.id ? req.params.id : res.socket.parser.incoming.user.userId;

		const allUsers =
			user && user !== "all"
				? await User.findOne({
						where: { deletedAt: null, id: user },
						attributes: helper.excludes,
						include: { model: Upload, as: "uploads", foreignKey: "user_id" },
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
		// console.log(error);
		return res.status(500).json({
			"message": error,
		});
	}
};

export const analytics = async (req, res) => {
	try {
		const allUpload = await Upload.findAndCountAll({
			where: { user_id: res.socket.parser.incoming.user.userId, deletedAt: null },
		});
		return res.status(200).json({
			"total_upload": allUpload.count,
		});
	} catch (error) {
		// console.log(error);
	}
};

export default getUsers;
