import { selectImage } from "../config/helper.js";
import Bookmark from "../model/Bookmark.js";
import Upload from "../model/Upload.js";

Bookmark.belongsTo(Upload, { as: "upload", foreignKey: "id" });

const getBookmarkById = async (id) => {
	const img = await Bookmark.findByPk(id, { attributes: { exclude: "deletedAt" } });
	return img;
};

const addBookmark = async (req, res) => {
	try {
		const img = await selectImage(req.params.id);
		if (img === null) return res.status(404).json({ "message": "not found" });
		const total_bookmark = parseInt(img.total_bookmark) + 1;

		const body = {
			creator_id: img.creator_id,
			img_url: img.id,
			user_id: req.body.user_id,
		};

		await Bookmark.create(body);
		await Upload.update({ total_bookmark }, { where: { id: img.id } });
		return res.status(200).json({ "message": "success" });
	} catch (error) {
		console.log(error);
	}
};

const removeBookmark = async (req, res) => {
	try {
		const getBookmark = await getBookmarkById(req.params.id);
		if (getBookmark === null) return res.status(404).json({});

		const img = await selectImage(getBookmark.img_url);
		if (img === null) return res.status(404).json({ "message": "not found" });

		const total_bookmark = parseInt(img.total_bookmark) - 1;
		await Bookmark.destroy({ where: { id: req.params.id } });
		await Upload.update({ total_bookmark }, { where: { id: img.id } });
		return res.status(200).json({ "message": "success" });
	} catch (error) {
		console.log(error);
	}
};

const userBookmarks = async (req, res) => {
	try {
		const bookmarks = await Bookmark.findAll({
			where: { user_id: req.params.user_id },
			include: {
				model: Upload,
				as: "upload",
			},
		});
		return res.status(200).json({ data: bookmarks, "message": "success" });
	} catch (error) {
		console.log(error);
	}
};

const bookmark = { addBookmark, removeBookmark, userBookmarks };
export default bookmark;
