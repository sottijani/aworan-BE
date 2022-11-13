import { decodeToken } from "../config/helper.js";
import Download from "../model/Download.js";
import Upload from "../model/Upload.js";
const downloadImage = async (req, res) => {
	try {
		const token = decodeToken(req);
		req.body.user_id = token.user_id;
		await Download.create(req.body);
		await Upload.increment({ total_download: 1 }, { where: { id: req.body.img_id } });
		return res.status(200).json({ "message": "success" });
		/*
			Pending Task
			1 log the amount earned
			2 increase user wallet balance , total earnings, and previous wallet balance
		 */
	} catch (error) {
		console.log(error);
	}
};

const getCreatorDownloadCount = async (req, res) => {
	const { count, rows } = await Download.findAndCountAll({ where: { creator_id: req.params.user_id } });
	return res.status(200).json({ count, data: rows, "message": "success" });
};

const getImageDownloadCount = async (req, res) => {
	const { count, rows } = await Download.findAndCountAll({ where: { img_id: req.params.id } });
	return res.status(200).json({ count, data: rows, "message": "success" });
};

const downloads = { getImageDownloadCount, getCreatorDownloadCount, downloadImage };
// export default downloadImage;
export default downloads;
