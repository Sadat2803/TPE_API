const { validateCreateVehicule } = require('./validateCreateVehicule')
const { validateDeleteVehicule } = require('./validateDeleteVehicule')
const { validateGetVehicule } = require('./validateGetVehicule')
const { validateUpdateVehicule } = require('./validateUpdateVehicule')

module.exports = {
    validateCreateVehicule,
    validateDeleteVehicule,
    validateGetVehicule,
    validateUpdateVehicule
}
