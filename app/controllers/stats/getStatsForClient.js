const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')
const moment = require('moment')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getStatsForClient = async (req, res) => {
	try {
		// const begin = moment().startOf('month')
		// const end = moment().endOf('month')

		const thisMonthCommandes = await Commande.find({
			//createdAt: { $gte: begin.toISOString(), $lt: end.toISOString() },
			clientID: req.params.id,
		})

		const allCommandes = await Commande.find({ clientID: req.params.id })

		return res.status(201).json({
			totalFactures: thisMonthCommandes.length,
			montantTotal: Number(
				allCommandes.reduce((n, { prix }) => n + prix, 0).toFixed(2)
			),
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getStatsForClient }
