import Bookmark from "../model/Bookmark";

const addBookMark = async (req, res) => {
	try {
		await Bookmark.create(req.body);
		return res.status(200).json({ "message": "successfully bookmarked" });
	} catch (error) {
		console.log(error);
	}
};

const removeBookmark = async (req, res) => {
	try {
		await Bookmark.destroy({ where: { id: req.params.id } });
		return res.status(200).json({ "message": "Bookmar removed" });
	} catch (error) {
		console.log(error);
	}
};

const bookmark = { addBookMark, removeBookmark };
export default bookmark;
