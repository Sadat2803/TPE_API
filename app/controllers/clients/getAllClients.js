const { handleError } = require('../../middleware/utils')
//const { getAllVehiculesFromDB } = require('./helpers')
const { getAllClientsFromDB } = require('./helpers')
/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllClients = async (req, res) => {
  try {
    res.status(200).json(await getAllClientsFromDB())
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllClients }