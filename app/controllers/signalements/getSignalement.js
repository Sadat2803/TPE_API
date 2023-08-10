const Signalement = require('../../models/signalement')
const { getItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getSignalement = async (req, res) => {
	try {
		const signalement = await Signalement.findOne({ _id: req.params.id })
		res.status(200).json(signalement)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getSignalement }
