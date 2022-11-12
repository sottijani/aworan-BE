import { Op } from "sequelize";
import Wallet from "../model/Wallet";

const fetchWallet = async (id) => {
	return await Wallet.findOne({ where: { id: id } });
};

const createWallet = async (req, res) => {
	try {
		await Wallet.create(req.body);
		return res.status(200).json({
			"message": "waller successfuly created",
		});
	} catch (error) {}
};

const getWallet = async (req, res) => {
	try {
		const wallet = await Wallet.findOne({
			where: {
				id: req.body.w_id,
				creator_id: req.param.c_id,
			},
		});
		return res.status(200).json({
			"data": wallet,
			"message": "wallet retrived",
		});
	} catch (error) {
		console.log(error);
	}
};

const incrementWallet = async (req, res) => {
	try {
		const currentWallet = await fetchWallet(req.param.id);
		const toAdd = parseInt(req.body.amount);
		const previous_balance = currentWallet.current_balance;
		const current_balance = (parseInt(currentWallet.current_balance) + toAdd).toString();
		const total_earnings = (parseInt(currentWallet.total_earnings) + toAdd).toString();

		await Wallet.update({ previous_balance, current_balance, total_earnings }, { where: { id: id } });
		return res.status(200).json({
			"message": "successful",
		});
	} catch (error) {
		console.log(error);
	}
};

const decrementWallet = async (req, res) => {
	try {
		const currentWallet = await fetchWallet(req.param.id);
		const toRemove = parseInt(req.body.amount);
		const previous_balance = currentWallet.current_balance;
		const current_balance = (parseInt(currentWallet.current_balance) - toRemove).toString();

		await Wallet.update({ previous_balance, current_balance, total_earnings }, { where: { id: id } });
		return res.status(200).json({
			"message": "complete",
		});
	} catch (error) {
		console.log(error);
	}
};

const wallets = { createWallet, getWallet, incrementWallet, decrementWallet };
