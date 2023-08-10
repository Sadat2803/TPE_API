const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')
const { customAlphabet } = require('nanoid')
const alphabet = '123456789'
const nanoid = customAlphabet(alphabet, 9)
/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req = {}) => {
	return new Promise((resolve, reject) => {
		const user = new User({
			...req,
			__id: nanoid(),
			verification: uuid.v4(),
		})
		user.save((err, item) => {
			if (err) {
				reject(buildErrObject(422, err.message))
			}
			resolve(item)
		})
	})
}

module.exports = { registerUser }
