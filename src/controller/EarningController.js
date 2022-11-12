import Earning from "../model/Earning";

const logEarning = async (req, res) => {
	try {
		await Earning.create(req.body.id);
		return res.status(403).json({
			"message": "Earning logged successful",
		});
	} catch (error) {}
};
