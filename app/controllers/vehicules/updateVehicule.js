const Vehicule = require('../../models/vehicule')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { vehiculeExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateVehicule = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesVehiculeExists = await vehiculeExistsExcludingItself(id, req.name)
    if (!doesVehiculeExists) {
      res.status(200).json(await updateItem(id, Vehicule, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateVehicule }
