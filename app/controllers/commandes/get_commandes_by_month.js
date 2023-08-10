const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommandesByMonth = async (req, res) => {
	try {
		const agg = [
			{
				$match: {
					clientID: req.params.id,
					// statut: 'terminer',
				},
			},
			{
				$group: {
					_id: {
						month: {
							$month: '$createdAt',
						},
						year: {
							$year: '$createdAt',
						},
					},
					commandes: {
						$addToSet: '$$ROOT',
					},
					totalAmount: {
						$sum: '$prix',
					},
				},
			},
			{
				$project: {
					month: '$_id.month',
					year: '$_id.year',
					commandes: 1,
					_id: 0,
					totalAmount: 1,
				},
			},
		]

		const result = await Commande.aggregate(agg)

		res.status(200).json({
			data: result,
			total_all: result.reduce(
				(prev, curr) => prev + curr.totalAmount,
				0
			),
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandesByMonth }
