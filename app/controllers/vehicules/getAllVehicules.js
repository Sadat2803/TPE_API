const { handleError } = require('../../middleware/utils')
//const { getAllVehiculesFromDB } = require('./helpers')
const { getAllVehiculesFromDB } = require('./helpers')
/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllVehicules = async (req, res) => {
  try {
    res.status(200).json(await getAllVehiculesFromDB())
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllVehicules }