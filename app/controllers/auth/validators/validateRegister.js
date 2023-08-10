const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
	check('cid').optional(),
	check('domain').optional(),
	check('phone').optional(),
	check('address').optional(),
	check('vehicules').optional(),
	check('city').optional(),
	check('postalCode').optional(),

	check('societe'),
	check('siret'),
	check('quality'),

	check('kbis'),
	check('logo'),

	check('epi'),
	check('manutention'),
	check('rippeurs'),

	check('danger'),
	check('fimo'),
	check('permis'),

	check('date_embauche'),
	check('date_naiss'),
	check('sexe'),
	check('type_vehicule'),

	check('transporter').optional(),

	check('first_name')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('last_name')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('role')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY'),
	check('email')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY')
		.isEmail()
		.withMessage('EMAIL_IS_NOT_VALID'),
	check('password')
		.exists()
		.withMessage('MISSING')
		.not()
		.isEmpty()
		.withMessage('IS_EMPTY')
		.isLength({
			min: 5,
		})
		.withMessage('PASSWORD_TOO_SHORT_MIN_5'),
	(req, res, next) => {
		validateResult(req, res, next)
	},
]

module.exports = { validateRegister }
