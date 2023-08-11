const Tarif = require('../../models/tarif')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTarif = async (req, res) => {
	try {
		const TYPE = req.query.type || 'MISEADISPO'
		const tarif = await Tarif.findOne({ TYPE }).lean()
		return res.status(201).json(tarif)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getTarif }
