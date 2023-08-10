const { matchedData } = require('express-validator')

const {
	findUser,
	userIsBlocked,
	checkLoginAttemptsAndBlockExpires,
	passwordsDoNotMatch,
	saveLoginAttemptsToDB,
	saveUserAccessAndReturnToken,
} = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')
//const { getChauffeurByTransporter } = require('../chauffeurs')
//const{suspendUserTransporter} = require('./suspendUserTransporter')
const User = require('../../models/user')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
	try {
		const errorSuspend = new Error('An error message')

		const data = matchedData(req)
		const user = await findUser(data.email)
		// console.log(user)
		// const isSuspended = user.suspendre
		// const errorSuspended = 'Account SuSPENDED'
		// console.log(isSuspended)
		await userIsBlocked(user)
		await checkLoginAttemptsAndBlockExpires(user)
		const isPasswordMatch = await checkPassword(data.password, user)
		if (!isPasswordMatch) {
			handleError(res, await passwordsDoNotMatch(user))
		} else {
			// all ok, register access and return token
			user.loginAttempts = 0
			await saveLoginAttemptsToDB(user)
			res.status(200).json(await saveUserAccessAndReturnToken(req, user))
		}
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { login }
