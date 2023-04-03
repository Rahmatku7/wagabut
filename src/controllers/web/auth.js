const { config, base_url } = require("../../helpers/system.js");

exports.login = async function(req, res) {
	try {
		res.clearCookie(config("app", "session_name"));
	} catch(err) {
		//do nothing
	}
	res.render("auth/login");
}

exports.logout = async function(req, res) {
	res.clearCookie(config("app", "session_name"));
	res.redirect( base_url('auth/login'));
}