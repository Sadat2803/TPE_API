const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')
const moment = require('moment')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getStats = async (req, res) => {
	try {
		const allCommandes = await Commande.find({})

		return res.status(201).json({
			totalFactures: allCommandes.length,
			montantTotal: Number(
				allCommandes.reduce((n, { prix }) => n + prix, 0).toFixed(2)
			),
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getStats }
