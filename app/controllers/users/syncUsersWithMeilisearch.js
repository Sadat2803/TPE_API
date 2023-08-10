const User = require('../../models/user')
const { updateItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const axios = require('axios')
const moment = require('moment')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const syncUsersWithMeilisearch = async (req, res) => {
	try {
		req = matchedData(req)

		const users = await User.find({})
			//.populate('')
			.lean()

		for (let user of users) {
			await axios({
				method: 'POST',
				url: 'http://141.94.27.46:7701/indexes/users/documents',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer BZAM9d7V9fecb50be7ebd07ef01bba41f77ce15b2ee07a27d4201eb1b9c81fe9cb727c68',
				},
				data: JSON.stringify(user),
			})
		}

		res.status(200).json({ status: 'ok' })
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { syncUsersWithMeilisearch }
