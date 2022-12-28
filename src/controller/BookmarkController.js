import { decodeToken, selectImage } from "../config/helper.js"
import Bookmark from "../model/Bookmark.js"
import Upload from "../model/Upload.js"

// Bookmark.belongsTo(Upload, { as: "upload", foreignKey: "id" });

const getBookmarkById = async (id) => {
  const img = await Bookmark.findByPk(id, { attributes: { exclude: "deletedAt" } })
  return img
}

const addBookmark = async (req, res) => {
  const token = decodeToken(req)
  try {
    req.body.user_id = token.user_id
    await Bookmark.create(req.body)
    await Upload.increment({ total_bookmark: 1 }, { where: { id: req.body.img_id } })

    return res.status(200).json({ "message": "success" })
  } catch (error) {
    console.log(error)
  }
}

const removeBookmark = async (req, res) => {
  try {
    const getBookmark = await getBookmarkById(req.params.id)
    if (getBookmark === null) return res.status(404).json({})

    const img = await selectImage(getBookmark.img_url)
    if (img === null) return res.status(404).json({ "message": "not found" })

    await Bookmark.destroy({ where: { id: req.params.id } })
    await Upload.decrement({ total_bookmark: 1 }, { where: { id: img.id } })
    return res.status(200).json({ "message": "success" })
  } catch (error) {
    console.log(error)
  }
}

const userBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: { user_id: req.params.user_id },
      include: {
        model: Upload,
        as: "upload"
      }
    })
    return res.status(200).json({ data: bookmarks, "message": "success" })
  } catch (error) {
    console.log(error)
  }
}

const bookmark = { addBookmark, removeBookmark, userBookmarks }
export default bookmark
