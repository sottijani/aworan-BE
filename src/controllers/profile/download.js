"use strict";

import fs from "fs";
import client from "https";
import path from "path";
import Download from "../../models/Download.js";
import Upload from "../../models/Upload.js";

// const download = (url) => {
// 	const filename = path.basename(url);
// 	return client.get(url, (res) => {
// 		const fileStream = fs.createWriteStream(filename);
// 		res.pipe(fileStream);
// 		fileStream.on("error", (err) => {
// 			console.log(err);
// 		});
// 		fileStream.on("finish", () => {
// 			fileStream.close();
// 		});
// 		fileStream.on("close", () => console.log("stream closed"));
// 	});
// };

const downloadImage = (req, res) => {
	try {
		res.download(req.query.img_url);
	} catch (error) {
		// console.log(error);
		return res.status(500).json({ "message": error });
	}
};

export const recordDownload = async (req, res) => {
	try {
		const download = await Download.create(req.body);
		if (download) {
			const img = await Upload.findOne({ where: { id: req.body.img_id } });
			const totalDownload = img.total_downloads ? parseInt(img.total_downloads) : 0;
			await Upload.update(
				{ total_downloads: totalDownload + 1 },
				{ where: { id: req.body.img_id } }
			);
			res.status(200).json({
				"message": "download successful",
			});
		}
	} catch (error) {
		// console.log(error);
		return res.status(500).json({ "message": error });
	}
};

export const bookmarkImage = async (res, req) => {
	const bookMark = await Upload.findOne({
		where: { user_id: req.body.user_id, img_id: req.body.img_id },
	});
	if (!Object.keys(bookMark)) {
		try {
			const create = await Upload.create(req.body);
			return res.status(200).json({ "message": "bookmarked added" });
		} catch (error) {
			// console.log(error);
			return res.status(500).json({ "message": error });
		}
	}
	await Upload.destroy({ where: { id: req.body.id } });
	return res.status(200).json({ "message": "bookmarked removed" });
};

export default downloadImage;
