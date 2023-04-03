const web = require("../routers/web.js");
const api = require("../routers/api.js");

module.exports = function(app){
	new web(app);
	new api(app);

	//not found handler
	app.get('*', function(req, res){
	  res.status(404).json({
	      "message": "page not found."
	   });
	});

	app.post('*', function(req, res){
	  res.status(404).json({
	      "message": "page not found."
	   });
	});

};