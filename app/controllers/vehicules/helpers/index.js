const { getAllVehiculesFromDB } = require('./getAllVehiculesFromDB')
const { vehiculeExists } = require('./VehiculeExists')
const { vehiculeExistsExcludingItself } = require('./vehiculeExistsExcludingItself')

module.exports = {
  getAllVehiculesFromDB,
  vehiculeExists,
  vehiculeExistsExcludingItself
}
