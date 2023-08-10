const Chauffeur = require('../../models/chauffeur')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { chauffeurExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createChauffeur = async (req, res) => {
  try {
    
      res.status(201).json(await createItem(req.body, Chauffeur))
    
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createChauffeur }
