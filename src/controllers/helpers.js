// @ts-check
import * as bcrypt from "bcrypt";

const helper = {
	"excludes": {
		exclude: ["password", "deteleteAt"],
	},

	"delete": (/** @type {{ [x: string]: String; }} */ obj, /** @type {String} */ property) => {
		const { [property]: initial, ...rest } = obj;
		const initV = { [property]: initial };

		return { rest, initV };
	},

	"validatemaail": (/** @type {string} */ email) => {
		const emailRegexp =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		return emailRegexp.test(email);
	},

	"encryptPassword": async (/** @type {{ toString: () => string | Buffer; }} */ pass) => {
		const saltRound = 10;
		const password = await bcrypt.hash(pass.toString(), saltRound);
		return password;
	},

	"decryptext": async (
		/** @type {{ toString: () => string | Buffer; }} */ word,
		/** @type {string} */ encryptedWord
	) => {
		const pass = await bcrypt.compare(word.toString(), encryptedWord);
		return pass;
	},
};

export default helper;
