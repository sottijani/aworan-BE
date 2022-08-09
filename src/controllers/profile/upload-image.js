"use strict";
import multer from "multer";
import Upload from "../../models/Upload.js";
import fs from "fs";
import path from "path";
import cloudinary from "cloudinary";
/**
 * Cloudinary intilization
 */
const cloudinaryImage = cloudinary.v2;
cloudinaryImage.config({
	cloud_name: "dd1zbrj8l",
	api_key: "547829252294477",
	api_secret: "-NXo4BoXCoDbudvCe5aKMb5JI1U",
	secure: true,
});

const multerStorage = multer.diskStorage({
	// destination: (req, file, cb) => {
	// 	cb(null, "./public/uploads");
	// },
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
		req.body.user_id = res.socket.parser.incoming.user.userId;
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			folder: "Aworan file",
		};
		const image = req.file && req.file;
		const path = image.path && image?.path.split("/");
		const uploadRes = await cloudinaryImage.uploader.upload(image.path, options);
		req.body.img_url = uploadRes.public_id;
		// req.body.img_url = `${path[1]}/${path[2]}`;÷

		if (path) {
			await Upload.create(req.body);
			return res.status(200).json({ "message": "Upload successful" });
		}
		return res.status(200).json({ "message": "Invalid image path" });
	} catch (error) {
		console.log(error);
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
