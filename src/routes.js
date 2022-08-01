import forgotPassword from "./controllers/auth/forget-password.js";
import login from "./controllers/auth/login.js";
import resetPassword from "./controllers/auth/reset-password.js";
import signUp from "./controllers/auth/signup.js";
import userType from "./controllers/auth/user-type.js";
("use strict");
// @ts-check

import verifyEmail from "./controllers/auth/verify-email.js";
import getUsers from "./controllers/profile/user.js";
import downloadImage from "./controllers/profile/download.js";
import upateProfile from "./controllers/profile/update-profile.js";
import uploadImage, { deleteImage, getImages, upload } from "./controllers/profile/upload-image.js";
import { authenticate } from "./token.js";
import approveImage from "./controllers/admin/approval.js";

const routes = (app) => {
	// auth
	app.post("/login", login);
	app.post("/signup", signUp);
	app.post("/create/user-type", userType);
	app.post("/forgot/password", forgotPassword);
	app.post("/verify/email", verifyEmail);
	app.post("/reset/password", resetPassword);

	// profile
	app.get("/users/", authenticate, getUsers);
	app.get("/user/:id", authenticate, getUsers);
	app.get("/:id/users", authenticate, getUsers);
	app.get("/profile", authenticate, getUsers);
	app.put("/update/profile", authenticate, upateProfile);
	app.put("/change/:phrase", authenticate, upateProfile);

	// upload and download
	app.post("/upload/", authenticate, upload.single("img"), uploadImage);
	app.delete("/delete/image/:id", authenticate, deleteImage);
	app.get("/uploads/", authenticate, getImages);
	app.get("/upload/:id", authenticate, getImages);
	app.post("/download", authenticate, downloadImage);

	// admin
	app.post("/approve/upload/:id", authenticate, approveImage);
};

export default routes;
