const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')
const { checkQueryString, getItems } = require('../../middleware/db')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllCommandesByClient = async (req, res) => {
	console.log(req.params.id)

	try {
		res.status(200).json(
			await getItems(req, Commande, {
				clientID: req.params.id,
			})
		)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getAllCommandesByClient }
