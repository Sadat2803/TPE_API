const Client = require('../../models/client')

const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 const createClient = async (req, res) => {
    try {
      res.status(201).json(await createItem(req.body, Client))    
    } catch (error) {
      handleError(res, error)
    }
  }
  
  module.exports = { createClient }