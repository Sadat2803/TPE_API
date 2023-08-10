const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const marginCommande = async (req, res) => {
	let update = {}
	if (req.body.margin) {
		update = {
			margin: req.body.margin,
		}
	}

	try {
		for (const item of req.body.commandes) {
			await Commande.findByIdAndUpdate(item, update)
		}

		res.status(200).json({
			result: 'OK',
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { marginCommande }
