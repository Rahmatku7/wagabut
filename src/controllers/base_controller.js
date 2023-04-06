const systemHelper = require("../helpers/system.js");
const { validationResult } = require('express-validator');

class base_controller {
	
	static class_name = "base_controller";
	static config = systemHelper.config;
	static base_url = systemHelper.base_url;
	static model = systemHelper.model;
	static validationResult = validationResult;

}

module.exports = base_controller;