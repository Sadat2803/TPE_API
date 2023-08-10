const Transporter = require('../../models/transporter')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateTransporterInDB } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTransporter = async (req, res) => {
  try {
    const id = req.params.id
    res.status(200).json(await updateItem(id, Transporter, req.body))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateTransporter }