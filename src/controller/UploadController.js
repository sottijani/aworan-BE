import { uploadImage } from "../config/helper.js";
import Upload from "../model/Upload.js";

const newUpload = async (req, res) => {
	try {
		const imgUrl = await uploadImage(req);
		req.body.img_url = imgUrl;
		const upload = await Upload.create(req.body);
		return res.status(200).json({
			"id": upload.id,
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

const removeImage = async (req, res) => {
	try {
		Upload.destroy({ where: { id: req.params.id } });
		return res.status(200).json({
			"message": "image deleted successfuly",
		});
	} catch (error) {
		console.log(error);
	}
};

const uploads = { newUpload, updateImage, removeImage };
export default uploads;
