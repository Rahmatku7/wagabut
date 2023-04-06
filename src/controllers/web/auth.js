const base_controller = require("../base_controller.js");

class $ extends base_controller {

	static login = async (req, res) => {
		try {
			res.clearCookie(config("app", "session_name"));
		} catch(err) {
			//do nothing
		}
		res.render("auth/login");
	}

	static logout = async(req, res) => {
		res.clearCookie($.config("app", "session_name"));
		res.redirect( $.base_url('auth/login'));
	}

}

module.exports = $;