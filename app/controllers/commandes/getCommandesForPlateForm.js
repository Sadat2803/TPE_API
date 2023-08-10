const Commande = require('../../models/commande')
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
const getCommandesForPlateForm = async (req, res) => {
	try {
		const query = await checkQueryString(req.query)
		const options = await listInitOptions(req)
		const commandes = await Commande.paginate(
			{
				...query,
				transporterID: { $exists: false },
				salon: true,
			},
			{
				...options,
				populate: ['courses', 'files'],
				sort: { absolute_start_date: 1 },
			}
		)

		res.status(200).send(commandes)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandesForPlateForm }
