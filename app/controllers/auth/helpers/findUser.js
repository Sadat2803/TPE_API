const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (email = '') => {
	return new Promise((resolve, reject) => {
		User.findOne(
			{
				email,
			},
			'password loginAttempts blockExpires first_name last_name email role verified verification suspendre status premium reduction',
			async (err, item) => {
				try {
					await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
					resolve(item)
				} catch (error) {
					reject(error)
				}
			}
		)
	})
}

module.exports = { findUser }
