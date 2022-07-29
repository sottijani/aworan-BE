"use strict";
// @ts-check

import Upload from "../../models/Upload";

const approveImage = async (req, res) => {
	try {
		await Upload.update(
			{ approved: true },
			{
				where: {
					id: req.params.id,
					deletedAt: null,
				},
			}
		);
		return res.status(200).json({ "message": "image approved" });
	} catch (error) {
		return res.status(500).json({ "message": error });
	}
};

export default approveImage;
