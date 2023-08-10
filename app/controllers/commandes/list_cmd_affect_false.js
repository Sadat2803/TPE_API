const Commande = require('../../models/commande')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const listCmdAffectFalse = async (req, res) => {
  try {
   // const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, Commande, {plateforme:'false'}))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { listCmdAffectFalse }