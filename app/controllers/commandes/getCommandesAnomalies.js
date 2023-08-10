const Commande = require('../../models/commande')

const { checkQueryString, listInitOptions } = require('../../middleware/db')

const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommandesAnomalies = async (req, res) => {
	try {
		const query = await checkQueryString(req.query)
		const options = await listInitOptions(req)
		const commandes = await Commande.paginate(
			{
				...query,
				salon: false,
				transporterID: { $ne: null },
				$or: [
					{
						type_signalement: { $ne: null },
					},
					{
						waypoints_overage: { $ne: false, $exists: true },
					},
				],
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
				sort: { recu: 1 },
			}
		)

		res.status(200).send(commandes)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandesAnomalies }
