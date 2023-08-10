const Client = require('../../models/client')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateClientsInDB } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateClient = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    req = matchedData(req)
    res.status(200).json(await updateClientsInDB(req, id))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateClient }