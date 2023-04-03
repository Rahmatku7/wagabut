const moment = require('moment');

exports.get_date = function(format="DD/MM/YYYY") {
	return moment().format(format);
}