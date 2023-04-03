const { body } = require('express-validator');

exports.login = [
	body('username').notEmpty(),
	body('password').isLength({ min: 8 }),
];