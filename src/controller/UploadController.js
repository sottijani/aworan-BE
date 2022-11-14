import { decodeToken, selectImage, uploadImage } from "../config/helper.js";
import Bookmark from "../model/Bookmark.js";
import Role from "../model/Role.js";
import Upload from "../model/Upload.js";
import User from "../model/User.js";

Upload.hasMany(Bookmark, { foreignKey: "img_url" });
Upload.belongsTo(User, { foreignKey: "creator_id", as: "creator" });

const newUpload = async (req, res) => {
	const token = decodeToken(req);
	req.body.creator_id = token.user_id;

	try {
		const role = await Role.findByPk(token.user_role);
		if (role.role_title !== "creator")
			return res.status(403).json({
				"message": "denied",
				"type": token.user_role,
			});
		const imgUrl = await uploadImage(req);
		req.body.img_url = imgUrl;
		const upload = await Upload.create(req.body);
		return res.status(200).json({
			"id": upload.id,
			"url": imgUrl,
			"message": "image upload successful",
		});
	} catch (error) {
		console.log(error);
	}
};

const updateImage = async (req, res) => {
	try {
		const body = req.body;
		const { img_url, ...contents } = body;
		Upload.update(contents, { where: { id: req.params.id } });
		return res.status(200).json({
			"message": "image updated",
		});
	} catch (error) {
		console.log(error);
	}
};

const getImages = async (req, res) => {
	try {
		const allImage = await Upload.findAll({
			attributes: { exclude: "deletedAt" },
			include: {
				model: User,
				as: "creator",
				attributes: { exclude: ["deletedAt", "password", "sub_status"] },
			},
		});
		return res.status(200).json({
			data: allImage,
			"message": "success",
		});
	} catch (error) {
		console.log(error);
	}
};

const getImage = async (req, res) => {
	try {
		const image = await selectImage(req.params.id, {
			include: {
				model: User,
				as: "creator",
				attributes: { exclude: ["deletedAt", "password", "sub_status"] },
			},
		});
		if (image !== null)
			return res.status(200).json({
				data: image,
				"message": "success",
			});
		return res.status(404).json({ "message": "image not found" });
	} catch (error) {
		console.log(error);
	}
};

const getCreatorImage = async (req, res) => {
	const token = decodeToken(req);
	try {
		const allImage = await Upload.findAll({ where: { creator_id: token.user_id } }, { attributes: { exclude: "deletedAt" } });
		if (!allImage.length)
			return res.status(404).json({
				data: allImage,
				"message": "No uploads",
			});
		return res.status(200).json({
			data: allImage,
			"message": "success",
		});
	} catch (error) {
		console.log(error);
	}
};

const removeImage = async (req, res) => {
	try {
		await Upload.destroy({ where: { id: req.params.id } });
		return res.status(200).json({ "message": "image deleted successfuly" });
	} catch (error) {
		console.log(error);
	}
};

const uploads = { newUpload, updateImage, removeImage, getImages, getImage, getCreatorImage };
export default uploads;
