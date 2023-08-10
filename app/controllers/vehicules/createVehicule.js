const Vehicule = require('../../models/vehicule')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { vehiculeExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createVehicule = async (req, res) => {
  try {
    console.log(req.name)
 // req = matchedData(req)
    //const doesVehiculeExists = await vehiculeExists(req.name)
    res.status(201).json(await createItem(req.body, Vehicule))

  //  if (!doesVehiculeExists) {}
    
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createVehicule }