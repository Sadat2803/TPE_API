const Client = require('../../models/client')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    .populate({
      path: 'logo',
      model: 'Media'
  }, {
      path: 'kbis',
      model: 'Media'
    })
    .lean()
  res.status(200).json(client)    //res.status(200).json(await getItems(req, Client, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getClient }