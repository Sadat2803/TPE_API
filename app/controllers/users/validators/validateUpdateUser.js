const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateUser = [
	check('address').optional(),
	check('domain').optional(),
	check('first_name').optional(),
	check('last_name').optional(),
	check('quality').optional(),
	check('siret').optional(),
	check('societe').optional(),

	check('status').optional(),
	check('password').optional(),

	check('email').optional(),
	check('suspendre').optional(),
	check('premium').optional(),
	check('reduction').optional(),
	check('role').optional(),
	check('phone').optional(),
	check('city').optional(),
	check('country').optional(),
	check('location').optional(),
	check('margin').optional(),
	check('id')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	(req, res, next) => {
		validateResult(req, res, next)
	},
]

module.exports = { validateUpdateUser }
