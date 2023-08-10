const Transporter = require('../../models/transporter')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { TransporterExistsExcludingItself } = require('./helpers')
const transporter = require('../../models/transporter')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTransporterStatus = async (req, res) => {

  try {

    const id = req.params.id
    res.status(200).json(await updateItem(id, Transporter, {
      statut_transporter : req.body.statut_transporter
    }))
    }
    
      //res.status(200).json(await updateItem(id, Commande, req.body))
      
   catch (error) {
    handleError(res, error)
  }

  }
module.exports = { updateTransporterStatus }
