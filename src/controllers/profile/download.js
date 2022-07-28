"use strict";

import fs from "fs";
import client from "http";
import path from "path";

const download = (url) => {
	const filename = path.basename(url);
	return client.get(url, (res) => {
		const fileStream = fs.createWriteStream(filename);

		res.pipe(fileStream);
		fileStream.on("error", (err) => {
			console.log(err);
		});
		fileStream.on("finish", () => {
			fileStream.close();
		});
		fileStream.on("close", () => console.log("stream closed"));
	});
};

const downloadImage = (req, res) => {
	try {
		const resp = download(req.body.img_url);
		resp.on("finish", (err) => res.status(200).json({ "message": "dowload completed" }));
		resp.on("error", (err) => console.log(err));
	} catch (error) {
		console.log(error);
		return res.status(500).json({ "message": error });
	}
};

export default downloadImage;
