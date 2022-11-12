import Download from "../model/Download.js";

const downloadImage = async (req, res) => {
	try {
		req.body.user_id = req.params.user_id;
		const response = await Download.create(req.body);
		return res.status(200).json({ download_id: response.isSoftDeleted, "message": "successful" });

		/*
			Pending Task
			1 log the amount earned
			2 increase user wallet balance , total earnings, and previous wallet balance
		 */
	} catch (error) {
		console.log(error);
	}
};

export default downloadImage;
