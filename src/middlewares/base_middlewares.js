const systemHelper = require("../helpers/system.js");

class base_middlewares {

	static class_name = "base middlewares";
	static base_url = systemHelper.base_url;
	static model = systemHelper.model;
	static config = systemHelper.config;

}

module.exports = base_middlewares;