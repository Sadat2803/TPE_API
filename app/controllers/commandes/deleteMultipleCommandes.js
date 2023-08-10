const Commande = require('../../models/commande')
const Course = require('../../models/course')
const {
	checkQueryString,
	getItems,
	listInitOptions,
	cleanPaginationID,
} = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { reject } = require('lodash')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteMultipleCommandes = async (req, res) => {
	try {
		for (const commande of req.body.commandes) {
			const _commande = await Commande.findById(commande)
			await Course.deleteMany({ _id: { $in: _commande.courses } })
			await Commande.deleteOne({ _id: commande })
		}

		res.status(200).json({ message: 'ok' })
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { deleteMultipleCommandes }
