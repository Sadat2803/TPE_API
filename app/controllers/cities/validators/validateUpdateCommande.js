const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateCommande = [
	check('id')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),

	check('transporterID').optional(),
	check('salon').optional(),
	check('statut').optional(),
	check('recu').optional(),

	check('prix').optional(),
	check('paymentStatus').optional(),
	check('paymentNote').optional(),

	check('waypoints').optional(),
	check('waypoints_overage').optional(),

	(req, res, next) => {
		validateResult(req, res, next)
	},
]

module.exports = { validateUpdateCommande }
