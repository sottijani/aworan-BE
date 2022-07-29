"use strict";
import multer from "multer";
import Upload from "../../models/Upload.js";

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		const fileName = file.originalname.split(".")[0];
		cb(null, `${fileName}_${Date.now()}.${ext}`);
	},
});

const filter = (req, file, cb) => {
	const mimetype = file.mimetype.split("/")[1].toLowerCase();
	const acceptedMimeTypes = ["jpg", "jpeg", "png"];
	if (acceptedMimeTypes.includes(mimetype)) cb(null, true);
	else cb(new Error("Unsurpported file format"), false);
};

export const upload = multer({ storage: multerStorage, fileFilter: filter });

const uploadImage = async (req, res, next) => {
	try {
		const image = req.file && req.file;
		const user_id = +req.body.user_id;
		const path = image.path && image?.path.split("/");

		if (path) {
			await Upload.create({
				img_url: `${path[1]}/${path[2]}`,
				user_id: user_id,
			});
			return res.status(200).json({ "message": "Upload successful" });
		}
		return res.status(200).json({ "message": "Invalid image path" });
	} catch (error) {
		return res.json({ "message": error });
	}
};

export const getImages = async (req, res) => {
	try {
		let allImages = req.params.id
			? await Upload.findAll({ where: { user_id: req.params.id } })
			: await Upload.findAll();
		return res.status(200).json({ "message": "All Images", "data": allImages });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ "message": error });
	}
};

export const deleteImage = async (req, res) => {
	try {
		await Upload.update(
			{ deletedAt: new Date().toTimeString() },
			{
				where: {
					id: req.params.id,
					deleted: null,
				},
			}
		);
		return res.status(200).json({ "message": "image approved" });
	} catch (error) {
		return res.status(500).json({ "message": error });
	}
};

export default uploadImage;
