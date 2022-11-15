import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import multer from "multer";
import Upload from "../model/Upload.js";
import jwt_decode from "jwt-decode";

const salt = 10;
const cloudinaryImage = cloudinary.v2;
cloudinaryImage.config({
	cloud_name: "dd1zbrj8l",
	api_key: "547829252294477",
	api_secret: "-NXo4BoXCoDbudvCe5aKMb5JI1U",
	secure: true,
});

export const harshPassword = async (password) => await bcrypt.hash(password.toString(), salt);

export const decryptPassword = async (password, harsh) => await bcrypt.compare(password.toString(), harsh);

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

export const uploadImage = async (req) => {
	try {
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			folder: "Aworan file",
		};
		const image = req.file && req.file;
		console.log(req.file);
		const uploadRes = await cloudinaryImage.uploader.upload(image.path, options);

		console.log(uploadRes.public_id);
		return uploadRes.public_id;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const validator = (email) => {
	const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	if (!email) return false;
	if (email.length > 254) return false;
	return emailRegexp.test(email);
};

export const selectImage = async (id, association = {}) => {
	try {
		const img = await Upload.findByPk(id, { attributes: { exclude: "deletedAt" }, ...association });
		return img;
	} catch (error) {
		console.log(error);
	}
};

export const decodeToken = (reqs) => {
	let token = reqs.headers.authorization;
	if (!token) return false;
	token = token.split(" ")[1];
	return jwt_decode(token);
};
