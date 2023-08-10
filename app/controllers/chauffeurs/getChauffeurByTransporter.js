const Chauffeur = require('../../models/chauffeur')
const { handleError } = require('../../middleware/utils')
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { checkQueryString, getItems } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getChauffeurByTransporter = async (req, res) => {
  try {
        res.status(200).json(await getItems(req , Chauffeur, {transporterID: req.params.transporterID}
        )
      )
    }
     catch (error) {
        handleError(res, error)
      }
}

module.exports = { getChauffeurByTransporter }
