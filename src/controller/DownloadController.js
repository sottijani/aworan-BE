import Download from "../model/Download.js";

const downloadImage = async (req, res) => {
	try {
		await Download.create(req.body);
		// download succesfful
		// log the amount earned
		// increase user waller balance and total earnings and previous wallet balance

		// return
		return res.status(200).json({ "message": "successful" });
	} catch (error) {
		console.log(error);
	}
};

export default downloadImage;
