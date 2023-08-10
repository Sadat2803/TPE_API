const { matchedData } = require('express-validator')

const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const {
	emailExists,
	sendRegistrationEmailMessage,
} = require('../../middleware/emailer')

const Commande = require('../../models/commande')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
	try {
		const locale = req.getLocale()
		req = matchedData(req)
		const doesEmailExists = await emailExists(req.email)

		if (!doesEmailExists) {
			const item = await registerUser(req)

			if (item.role === 'chauffeur') {
				// TODO index this user in meilisearch
				// call the add endpoint with this id
				// ideally we would want to index everybody not just chauffeurs
			}

			const userInfo = await setUserInfo(item)

			if (req.cid) {
				await Commande.updateOne(
					{ _id: req.cid },
					{ $set: { clientID: item._id } }
				)
			}

			const response = await returnRegisterToken(item, userInfo)
			sendRegistrationEmailMessage(locale, item)
			res.status(201).json(response)
		}
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { register }
