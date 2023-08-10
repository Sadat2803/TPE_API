const Commande = require('../../models/commande')
const Course = require('../../models/course')
const { handleError } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
    await Course.deleteMany({ _id: { $in: commande.courses } })
    res.status(200).json(await deleteItem(req.params.id, Commande))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteCommande }
