const Tarif = require('../../models/tarif')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createTarif = async (req, res) => {
	try {
		const data = { ...req.body }
		const tarif = await Tarif.updateOne({ TYPE: req.body.TYPE }, data, {
			upsert: true,
		})
		return res.status(201).json(tarif)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { createTarif }
