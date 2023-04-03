const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { model, config, base_url } = require("../../helpers/system.js");
const { validationResult } = require('express-validator');

exports.login = async function(req, res) {

	const validation = validationResult(req);

	if(validation.isEmpty()) {
		let user = await model("users").findOne([
			['where', 'username', req.body.username],
			['orWhere', 'email', req.body.username],
		]);

		if(user) {

			let confirm = await bcrypt.compare(req.body.password, user.password);
			if(confirm) {
				let token = jwt.sign({
					id: user.id,
				}, config("app", "jwtPrivateKey"), {
					expiresIn: "24h"
				});

				res.cookie(config("app", "session_name"), token, {
					httpOnly: true,
					secure: true,
					maxAge: 3600000 * 24
				});

				res.json({
					redirect_to: base_url(`${user.group}`),
					token: token
				});
			} else {
				res.status(400).json({
					"message": "password not match."
				});
			}

		} else {
			res.status(400).json({
				"message": "user not found."
			});
		}
	} else {
		return res.status(400).json({
			message: "Periksa kembali form anda.",
			errors: validation.array()
		});
	}
}
