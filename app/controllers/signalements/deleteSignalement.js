const Commande = require('../../models/commande')
const Signalement = require('../../models/signalement')
const { handleError } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteSignalement = async (req, res) => {
	try {
		const currentSignalement = await Signalement.findOne({
			_id: req.params.id,
		})

		const currentCommande = await Commande.findOne({
			_id: currentSignalement.commande,
		})

		await Signalement.deleteOne({ _id: currentSignalement._id })

		const all = await Signalement.find({ commande: currentCommande._id })

		await Commande.updateOne(
			{
				_id: currentCommande._id,
			},
			{
				$set: {
					signaler: all.length > 0,
					signalement_count: all.length,
				},
			}
		)

		res.status(200).json({ ok: true })
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { deleteSignalement }
