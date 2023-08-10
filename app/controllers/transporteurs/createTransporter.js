const Transporter = require('../../models/transporter')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { TransportersExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createTransporter = async (req, res) => {
  try {
    req = matchedData(req)
   
      res.status(201).json(await createItem(req, Transporter ))
    
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createTransporter }