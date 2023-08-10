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
	getUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
	getChauffeurs,
	getChauffeursOfTransporter,
	syncUsersWithMeilisearch,
} = require('../controllers/users')
const {
	getNewTransporters,
} = require('../controllers/users/getNewTransporters')
const {
	getValidTransporters,
} = require('../controllers/users/getValidTransporters')

const {
	validateCreateUser,
	validateGetUser,
	validateUpdateUser,
	validateDeleteUser,
} = require('../controllers/users/validators')

/*
 * Users routes
 */

/*
 * Get items route
 */
router.get(
	'/',
	// requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	getUsers
)

router.get(
	'/meilisearch',
	// requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	syncUsersWithMeilisearch
)

router.get(
	'/transporter/:id/chauffeurs',
	// requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	getChauffeursOfTransporter
)

router.get('/transporters/new', getNewTransporters)

router.get('/transporters/valid', getValidTransporters)

router.get(
	'/chauffeurs',
	// requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	getChauffeurs
)

/*
 * Create new item route
 */
router.post(
	'/',
	requireAuth,
	roleAuthorization(['admin']),
	trimRequest.all,
	validateCreateUser,
	createUser
)

/*
 * Get item route
 */
router.get(
	'/:id',
	// requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	validateGetUser,
	getUser
)

/*
 * Update item route
 */
router.patch(
	'/:id',
	// requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	validateUpdateUser,
	updateUser
)

/*
 * Delete item route
 */
router.delete(
	'/:id',
	// requireAuth,
	// roleAuthorization(['admin']),
	// trimRequest.all,
	validateDeleteUser,
	deleteUser
)

module.exports = router
