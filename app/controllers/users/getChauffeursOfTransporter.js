const User = require('../../models/user')
const { handleError } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getChauffeursOfTransporter = async (req, res) => {
	try {
		res.status(200).json(
			await getItems(req, User, {
				transporter: req.params.id,
			})
		)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getChauffeursOfTransporter }
