const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
const validateUpdateProfile = [
	check('_id'),
	check('domain'),
	check('phone'),
	check('address'),
	check('societe'),
	check('siret'),
	check('quality'),
	check('kbis').optional(),
	check('city').optional(),
	check('postalCode').optional(),

	check('logo').optional(),
	check('first_name'),
	check('last_name'),
	check('email'),
	check('password').optional(),
	check('vehicules').optional(),
	check('rippeurs').optional(),
	check('manutention').optional(),
	check('epi').optional(),

	check('sexe').optional(),
	check('permis').optional(),
	check('type_vehicule').optional(),
	check('date_naiss').optional(),
	check('date_embauche').optional(),
	check('fimo').optional(),
	check('danger').optional(),

	(req, res, next) => {
		validateResult(req, res, next)
	},
]

module.exports = { validateUpdateProfile }
