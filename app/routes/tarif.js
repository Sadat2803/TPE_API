const express = require('express')
const router = express.Router()
require('../../config/passport')
// const passport = require('passport')
// const requireAuth = passport.authenticate('jwt', {
// 	session: false,
// })
// const trimRequest = require('trim-request')
const { createTarif, getTarif, payTarif, payTarifMobile } = require('../controllers/tarif')

router.post('/pay', payTarif)
router.post('/pay-mobile', payTarifMobile)

router.post('/', createTarif)

router.get('/', getTarif)

module.exports = router
