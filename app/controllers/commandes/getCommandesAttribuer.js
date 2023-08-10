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
const getCommandesAttribuer = async (req, res) => {
	try {
		const query = await checkQueryString(req.query)
		const options = await listInitOptions(req)
		const commandes = await Commande.paginate(
			{
				...query,
				transporterID: { $ne: null },
				salon: false,
			},
			{
				...options,
				populate: [
					'courses',
					'files',
					{
						path: 'clientID',
						populate: 'logo',
					},
					{
						path: 'transporterID',
						populate: 'logo',
					},
				],
				sort: { recu: 1, statut: 1 },
			}
		)

		res.status(200).send(commandes)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandesAttribuer }
