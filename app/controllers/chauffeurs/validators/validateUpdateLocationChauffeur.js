const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update location for chauffeur
 */
const validateUpdateLocationChauffeur = [
	check('id')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('lat')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('lng')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	(req, res, next) => {
		validateResult(req, res, next)
	},
]

module.exports = { validateUpdateLocationChauffeur }
