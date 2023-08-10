const Signalement = require('../../models/signalement')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const Commande = require('../../models/commande')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createSignalement = async (req, res) => {
	try {
		const signalement = await createItem(req.body, Signalement)

		await Commande.updateOne(
			{
				_id: req.body.commande,
			},
			{
				$set: {
					signaler: true,
					type_signalement: req.body.type || null,
				},
				$inc: {
					signalement_count: 1,
				},
			}
		)

		res.status(201).json(signalement)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { createSignalement }
