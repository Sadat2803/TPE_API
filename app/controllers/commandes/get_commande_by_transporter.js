const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')
const { getItems } = require('../../middleware/db')
const { matchedData } = require('express-validator')
/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommandesByTransporter = async (req, res) => {
	console.log(req.params.id)

	try {
		res.status(200).json(
			await getItems(req, Commande, {
				transporterID: req.params.id,
				statut: 'terminer',
			})
		)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandesByTransporter }
