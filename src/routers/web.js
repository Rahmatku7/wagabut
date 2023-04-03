const { controller, middleware } = require("../helpers/system.js");
const router = require("express").Router;

module.exports = function(app){
	app.get('/', controller("web/home::index"));

	const auth = new router();
	auth.get("/login", controller("web/auth::login"));
	auth.get("/logout", controller("web/auth::logout"));
	app.use("/auth", auth)

	const admin = new router();
	admin.get("/", controller("web/home::index"));
	admin.get("/test", controller("web/home::index"));
	app.use("/admin", middleware('authentication::auth_group'), admin);
}