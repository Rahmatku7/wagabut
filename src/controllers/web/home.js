const base_controller = require("../base_controller.js");

class $ extends base_controller {

	static index = async(req, res)=> {
		res.render("index", {
			layout: "template"
		});
	}

}

module.exports = $;