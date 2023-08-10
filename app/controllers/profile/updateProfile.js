const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateProfileInDB } = require('./helpers')
const User = require('../../models/user')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req, res) => {
	try {
		const id = await isIDGood(req.body._id)

		req = matchedData(req)

		console.log(req)

		await updateProfileInDB(req, id)

		const user = await User.findOne({ _id: req._id })

		if (req.password) {
			user.password = req.password
			await user.save()
		}

		return res.status(200).json(user)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { updateProfile }
