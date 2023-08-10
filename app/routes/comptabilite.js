const express = require('express')

const router = express.Router()

const { getComptabiliteClients } = require('../controllers/comptabilite')
const { getComptabiliteTransporteurs } = require('../controllers/comptabilite')

router.get('/clients', getComptabiliteClients)
router.get('/transporteurs', getComptabiliteTransporteurs)

module.exports = router
