const Commande = require('../../models/commande')
const { getItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommande = async (req, res) => {
	try {
		const commande = await Commande.findById(req.params.id)
		// .populate({
		// 	path: 'courses',
		// 	populate: 'files',
		// })
		// .lean()
		res.status(200).json(commande)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommande }
