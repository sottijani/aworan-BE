import bookmark from "../controller/BookmarkController.js"
import downloads from "../controller/DownloadController.js"
import roles from "../controller/RoleController.js"
import uploads from "../controller/UploadController.js"
import users from "../controller/UserController.js"
import { upload } from "./helper.js"
import token from "./token.js"

const cloudinaryLink = "https://res.cloudinary.com/dd1zbrj8l/image/upload/v1668449534/"
const { authenticate } = token

const routes = (app) => {
  app.post("/signup", users.signUp)
  app.post("/signin", users.signIn)
  app.get("/users", authenticate, users.getUsers)
  app.get("/profile", authenticate, users.profile)
  app.put("/user/", authenticate, users.updateProfile)
  app.get("/user/:id", authenticate, users.profile)
  app.put("/user/password", authenticate, users.changePassword)
  app.put("/profile/pic", authenticate, users.changeProfilepic)

  app.post("/role", roles.createrRole)
  app.put("/role/:id", authenticate, roles.updateRole)
  app.get("/roles", roles.getRoles)
  app.get("/role/:id", roles.getRole)

  app.post("/upload", authenticate, upload.single("img"), uploads.newUpload)
  app.put("/upload/:id", authenticate, uploads.updateImage)
  app.get("/uploads", uploads.getImages)
  app.get("/uploads/approved", uploads.approvedImages)
  app.get("/upload/:id", uploads.getImage)
  app.get("/uploads/creator", authenticate, uploads.getCreatorImage)
  app.delete("/upload/remove/:id", authenticate, uploads.removeImage)

  app.post("/bookmark", authenticate, bookmark.addBookmark)
  app.delete("/bookmark/:id", authenticate, bookmark.removeBookmark)
  app.get("/bookmarks/:user_id", authenticate, bookmark.userBookmarks)

  app.post("/download", authenticate, downloads.downloadImage)
  app.get("/downloads/creator/:user_id", authenticate, downloads.getCreatorDownloadCount)
  app.get("/downloads/image/:id", authenticate, downloads.getImageDownloadCount)

  app.get("/analytics", authenticate, downloads.analytics)

  app.get("/image", (req, res) => {
    return res.send(cloudinaryLink)
  })
}

export default routes
