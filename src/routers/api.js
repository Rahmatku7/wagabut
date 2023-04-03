const { controller, validation } = require("../helpers/system.js");
const router = require("express").Router;


module.exports = function(app) {
	app.get("/api", function(req, res){
		res.json({
			"msg": "api running.",
			"url": req.base_url()
		});
	});

	const auth = new router();
	auth.post("/login", validation('auth::login'), controller("api/auth::login"));
	app.use("/api", auth)
}