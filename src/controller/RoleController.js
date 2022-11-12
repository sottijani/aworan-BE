import Role from "../model/Role.js";

const createrRole = async (req, res) => {
	try {
		const checkRole = await Role.findOne({ where: { role_title: req.body.role_title } });
		if (checkRole !== null) return res.status(403).json({ message: "Role already exist" });

		await Role.create(req.body);
		return res.status(403).json({ message: "role creation successful " });
	} catch (error) {
		console.log(error);
	}
};

const updateRole = async (req, res) => {
	try {
		await Role.update(req.body, { where: { id: req.params.id } });
		return res.status(200).json({ message: "role updates " });
	} catch (error) {
		console.log(error);
	}
};

const getRoles = async (req, res) => {
	try {
		const response = await Role.findAll({ attributes: { exclude: "deletedAt" } });
		return res.status(200).json({ data: response, message: "success" });
	} catch (error) {
		console.log(error);
	}
};

const getRole = async (req, res) => {
	try {
		const response = await Role.findByPk(req.params.id, { attributes: { exclude: "deletedAt" } });
		if (response === null) return res.status(404).json({ message: "no such roles" });
		return res.status(200).json({ data: response, message: "success" });
	} catch (error) {
		console.log(error);
	}
};

const roles = { createrRole, updateRole, getRoles, getRole };
export default roles;
