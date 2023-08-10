const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')

const { getAllVehicules,
   createVehicule, 
   deleteVehicule,
   updateVehicule,
   getVehicule
    
  } = require('../controllers/vehicules')
const {
  validateCreateVehicule,
  validateGetVehicule,
  validateUpdateVehicule,
  validateDeleteVehicule
} = require('../controllers/vehicules/validators')
router.get('/all', getAllVehicules)
/*
 * Create new item route
 */
router.post(
    '/',
    requireAuth,
    roleAuthorization(['transporter']),
    trimRequest.all,
    validateCreateVehicule,
    createVehicule
  )


  /*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['transporter']),
  trimRequest.all,
  validateDeleteVehicule,
  deleteVehicule
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['transporter']),
  trimRequest.all,
  validateUpdateVehicule,
  updateVehicule
)
//erreur to get one Vehicule
/*router.get(
  '/:id',
 requireAuth,
  roleAuthorization(['transporter']),
  trimRequest.all,
  validateGetVehicule,
  getVehicule
)*/

module.exports = router
