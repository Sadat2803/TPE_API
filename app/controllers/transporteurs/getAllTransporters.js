const { handleError } = require('../../middleware/utils')
//const { getAllVehiculesFromDB } = require('./helpers')
const { getAllTransportersFromDB } = require('./helpers')
/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllTransporters = async (req, res) => {
  try {
    res.status(200).json(await getAllTransportersFromDB())
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllTransporters }