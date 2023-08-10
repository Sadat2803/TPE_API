const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const attributionCommandeForSalon = async (req, res) => {
	try {
		for (const item of req.body.commandes) {
			await Commande.updateOne(
				{
					_id: item,
				},
				{
					$set: {
						salon: true,
					},
				}
			)
		}

		res.status(200).json({
			result: 'OK',
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { attributionCommandeForSalon }
