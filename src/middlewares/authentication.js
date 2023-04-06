const jwt = require("jsonwebtoken");
const base_middlewares = require("./base_middlewares");

class $ extends base_middlewares {
	static unauthenticate_url = $.base_url('auth/login');
	static logout_url = $.base_url('auth/logout');

	static session_check = async function(token) {
		let decoded = jwt.verify(token, $.config("app", "jwtPrivateKey"));
		let user = await $.model('users').findOne([
			['where', 'id', decoded.id]
		]);
		
		return user;
	}

	static authenticate = async function (req, res, next) {
		if(req.cookies[$.config("app", "session_name")] ?? false) {
			try {
				const token = req.cookies[$.config("app", "session_name")];
				const user = await $.session_check(token);
				if(user ?? false) {
					req.userdata = user; 
					next();
				} else {
					res.status(401).redirect( $.logout_url );
				}
			} catch(err) {
				res.status(401).redirect( $.logout_url );
			}
		} else {
			res.status(401).redirect( $.unauthenticate_url );
		}
	}

	static auth_group = async function (req, res, next) {
		if(req.cookies[$.config("app", "session_name")] ?? false) {
			try {
				const token = req.cookies[$.config("app", "session_name")];
				const user = await $.session_check(token);
				const group = req._parsedUrl._raw.replace(/^\/+|\/+$/g, '').split("/")[0];
				if(user ?? false) {
					req.userdata = user;
					if(group.toLowerCase() === user.group.toLowerCase()) {
						next();
					} else {
						res.status(401).redirect( $.logout_url );
					}
				} else {
					res.status(401).redirect( $.logout_url );
				}
			} catch(err) {
				res.status(401).redirect( $.logout_url );
			}
		} else {
			res.status(401).redirect( $.unauthenticate_url );
		}
	}
}

module.exports = $;