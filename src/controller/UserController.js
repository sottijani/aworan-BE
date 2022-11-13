import { decodeToken, decryptPassword, harshPassword, uploadImage, validator } from "../config/helper.js";
import token from "../config/token.js";
import Upload from "../model/Upload.js";
import User from "../model/User.js";

User.hasMany(Upload, { foreignKey: "creator_id" });
const signUp = async (req, res) => {
	const body = req.body;
	body.password = await harshPassword(req.body.password);
	const validateEmail = validator(req.body.email);
	console.log(validateEmail);
	if (!validateEmail)
		return res.status(403).json({
			"message": "Invalid email format",
		});

	try {
		const checkEmailExist = await User.findOne({
			where: { email: req.body.email },
		});
		if (checkEmailExist !== null)
			return res.status(403).json({
				"message": "User already exist",
			});

		const response = await User.create(body);
		return res.status(200).json({
			"id": response.id,
			"message": "sign up successful",
		});
	} catch (error) {
		console.log(error);
	}
};

const signIn = async (req, res) => {
	const body = req.body;
	try {
		const user = await User.findOne({ where: { email: body.email }, attributes: { exclude: "deletedAt" } });
		if (user === null)
			return res.status(404).json({
				"message": "No email in our database",
			});
		const match = await decryptPassword(body.password, user.password);
		if (match)
			return res.status(200).json({
				"token": token.accessToken({
					user_id: user.id,
					user_role: user.primary_role,
				}),
				"message": "login successful",
			});
	} catch (error) {
		console.log(error);
	}
};

const getUsers = async (req, res) => {
	const response = await User.findAll({ attributes: { exclude: ["password", "deletedAt"] } });
	return res.status(200).json({ "data": response, "message": " retrived" });
};

const profile = async (req, res) => {
	const token = decodeToken(req);
	try {
		const id = req.params.id ? req.params.id : token.user_id;
		const response = await User.findByPk(id, {
			attributes: { exclude: ["deletedAt", "password"] },
		});
		return res.status(200).json({ "data": response, "message": "profile retrived" });
	} catch (error) {
		console.log(error);
	}
};

const updateProfile = async (req, res) => {
	const token = decodeToken(req);
	try {
		const { password, img_url, ...body } = req.body;
		await User.update(body, { where: { id: token.user_id } });
		return res.status(200).json({ "message": "Profile update successful" });
	} catch (error) {}
};

const changePassword = async (req, res) => {
	try {
		const token = decodeToken(req);
		let password = await harshPassword(req.body.password);
		await User.update({ password: password }, { where: { id: token.user_id } });
		return res.status(200).json({ "message": "password change successful" });
	} catch (error) {}
	console.log(error);
};

const resetPassword = async (req, res) => {
	const pin = req.params.pin;
	let password = await harshPassword(req.body.password);
	await User.update({ password: password }, { where: { reset_pin: pin } });
};

const forgotPassword = async (req, res) => {
	// send email
	return res.json({ message: "comming soon" });
};

const changeProfilepic = async (req, res) => {
	const token = decodeToken(req);
	try {
		const imgUrl = await uploadImage(req);
		await User.update({ img_url: imgUrl }, { where: { id: token.user_id } });

		return res.status(200).json({ "message": "image upload successful" });
	} catch (error) {
		console.log(error);
	}
};

const users = { signIn, signUp, profile, updateProfile, changePassword, resetPassword, forgotPassword, changeProfilepic, getUsers };
export default users;
