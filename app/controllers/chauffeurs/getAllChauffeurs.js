const { handleError } = require('../../middleware/utils')
const { getAllChauffeursFromDB } = require('./helpers')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllChauffeurs = async (req, res) => {
  try {
    res.status(200).json(await getAllChauffeursFromDB())
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllChauffeurs }