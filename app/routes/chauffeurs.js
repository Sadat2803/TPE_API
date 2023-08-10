const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
	session: false,
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')

const {
	getAllChauffeurs,
	createChauffeur,
	updateChauffeur,
	getChauffeur,
	deleteChauffeur,
	getChauffeurByTransporter,
	updateLocationChauffeur,
} = require('../controllers/chauffeurs')

const {
	validateCreateChauffeur,
	validateDeleteChauffeur,
	validateGetChauffeur,
	validateUpdateChauffeur,
	validateUpdateLocationChauffeur,
} = require('../controllers/chauffeurs/validators')

router.get('/all', getAllChauffeurs)
router.get('/bytransporter/:id', getChauffeurByTransporter)
/*
 * Create new item route
 */
router.post(
	'/add',
	// requireAuth,
	// roleAuthorization(['transporter']),
	trimRequest.all,
	//validateCreateChauffeur,
	createChauffeur
)

/*
 * Delete item route
 */
router.delete(
	'/:id',
	requireAuth,
	roleAuthorization(['transporter']),
	trimRequest.all,
	validateDeleteChauffeur,
	deleteChauffeur
)

/*
 * Update item route
 */
router.patch(
	'/:id',
	requireAuth,
	roleAuthorization(['transporter']),
	trimRequest.all,
	validateUpdateChauffeur,
	updateChauffeur
)

router.patch(
	'/location/:id',
	requireAuth,
	roleAuthorization(['chauffeur']),
	trimRequest.all,
	validateUpdateLocationChauffeur,
	updateLocationChauffeur
)

router.get(
	'/:id',
	requireAuth,
	roleAuthorization(['transporter']),
	trimRequest.all,
	validateGetChauffeur,
	getChauffeur
)
module.exports = router
