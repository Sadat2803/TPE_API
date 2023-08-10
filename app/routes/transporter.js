const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')


const {
getAllTransporters,
getTransporter,
createTransporter,
deleteTransporter,
updateTransporter,
getAllNewTransporter,
updateTransporterStatus
//suspendTransporter
} = require ('../controllers/transporteurs')

const{
validateCreateTransporter,
validateGetTransporter,
validateDeleteTransporter,
validateUpdateTransporter
} = require ('../controllers/transporteurs/validators')


router.patch('/statut_transporter/:id', 
requireAuth,
roleAuthorization(['admin']),
trimRequest.all,
validateUpdateTransporter,

updateTransporterStatus)





router.get('/all', getAllTransporters)
router.get('/all/new', getAllNewTransporter)
//router.get('/suspended/:id', suspendTransporter)

router.post(
    '/add',
   requireAuth,
    roleAuthorization(['transporter']),
    trimRequest.all,
validateCreateTransporter,
    createTransporter
  )

  /*
 * Delete item route
 */
  router.delete(
    '/:id',
    requireAuth,
    roleAuthorization(['transporter']),
    trimRequest.all,
    validateDeleteTransporter,
    deleteTransporter
  )

/*
 * Update item route
 */
router.patch(
    '/:id',
    requireAuth,
    roleAuthorization(['transporter']),
    trimRequest.all,
   // validateUpdateTransporter,
    updateTransporter
  )



  router.get(
    '/:id',
    requireAuth,
    roleAuthorization(['transporter']),
    trimRequest.all,
    validateGetTransporter,
    getTransporter
  )


module.exports = router
