const Commande = require('../../models/commande')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommandesForAdmin = async (req, res) => {
	try {
		let query = await checkQueryString(req.query)
		query = {
			...query,
			transporterID: {
				$exists: false,
			},
			salon: false,
		}

		console.log(query)

		res.status(200).json(await getItems(req, Commande, query))
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandesForAdmin }
