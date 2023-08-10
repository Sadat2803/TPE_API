const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const attributionCommande = async (req, res) => {
	let update = {}

	if (req.body.chauffeurID) {
		update = {
			chauffeurID: req.body.chauffeurID,
		}
	}

	if (req.body.transporterID) {
		update = {
			transporterID: req.body.transporterID,
		}
	}

	if (req.body.salon !== undefined) {
		update = {
			salon: req.body.salon,
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

module.exports = { attributionCommande }
