const User = require('../../models/user')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getComptabiliteTransporteurs = async (req, res) => {
    try {
		let { size, page } = req.query

		size = parseInt(size)
		page = parseInt(page)

		if (page > 0) page--

		const agg = [
			{
				$match: {
					role: 'transporter',
				},
			},
			{
				$addFields: {
					__id: {
						$toString: '$_id',
					},
				},
			},
			{
				$lookup: {
					from: 'commandes',
					localField: '__id',
					foreignField: 'transporterID',
					as: 'commandes',
				},
			},
			{
				$addFields: {
					totalSpent: {
						$sum: '$commandes.prix',
					},
				},
			},
			{
				$facet: {
					metadata: [
						{
							$group: {
								_id: null,
								total: {
									$sum: 1,
								},
							},
						},
					],
					transporters: [
						{
							$sort: {
								totalSpent: -1,
							},
						},
						{
							$skip: page * size,
						},
						{
							$limit: size,
						},
					],
					totalAllTransporters: [
						{
							$group: {
								_id: null,
								totalAmt: {
									$sum: '$totalSpent',
								},
							},
						},
					],
				},
			},
			{
				$project: {
					docs: '$transporters',
					totalDocs: {
						$arrayElemAt: ['$metadata.total', 0],
					},
					totalPrix: {
						$arrayElemAt: ['$totalAllTransporters.totalAmt', 0],
					},
				},
			},
		]

		const result = await User.aggregate(agg)

		res.status(200).json(result[0])
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getComptabiliteTransporteurs }
