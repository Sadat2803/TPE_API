const Signalement = require('../../models/signalement')
const { updateItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateSignalement = async (req, res) => {
	try {
		res.status(200).json(
			await updateItem(req.params.id, Signalement, req.body)
		)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { updateSignalement }
