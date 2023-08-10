const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateGetInvoice = [
	check('type')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('client')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('commandes'),
	(req, res, next) => {
		validateResult(req, res, next)
	},
]

module.exports = { validateGetInvoice }
