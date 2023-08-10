const Chauffeur = require('../../models/chauffeur')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { chauffeurExistsExcludingItself } = require('./helpers')

/**
 * Update chauffeur location
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateLocationChauffeur = async (req, res) => {
	try {
		req = matchedData(req)
		const id = await isIDGood(req.id)
		const doesChauffeurExists = await chauffeurExistsExcludingItself(
			id,
			req.first_name
		)

		if (!doesChauffeurExists) {
			res.status(200).json(await updateItem(id, Chauffeur, req))
		}
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { updateLocationChauffeur }
