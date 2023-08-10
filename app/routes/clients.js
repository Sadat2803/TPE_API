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
	createClient,
	updateClient,
	deleteClient,
	getAllClients,
	getClient,
} = require('../controllers/clients')

const {
	validateCreateClient,
	validateDeleteClient,
	validateGetClient,
	validateUpdateClient,
} = require('../controllers/clients/validators')

router.get('/all', getAllClients)

router.post(
	'/',
	//requireAuth,
	// roleAuthorization(['admin']),
	trimRequest.all,
	//validateCreateClient,
	createClient
)

/*
 * Delete item route
 */
router.delete(
	'/:id',
	requireAuth,
	roleAuthorization(['client']),
	trimRequest.all,
	validateDeleteClient,
	deleteClient
)

/*
 * Update item route
 */
router.patch(
	'/:id',
	requireAuth,
	roleAuthorization(['client']),
	trimRequest.all,
	validateUpdateClient,
	updateClient
)

router.get(
	'/:id',
	requireAuth,
	roleAuthorization(['client']),
	trimRequest.all,
	validateGetClient,
	getClient
)

module.exports = router
