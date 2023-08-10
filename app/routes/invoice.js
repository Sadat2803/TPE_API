const express = require('express')
const router = express.Router()
require('../../config/passport')

const {
	getInvoice,
	getInvoiceForOneCommande,
} = require('../controllers/invoice')

const { validateGetInvoice } = require('../controllers/invoice/validators')

router.post('/', validateGetInvoice, getInvoice)
router.post('/single', getInvoiceForOneCommande)
//router.get('/:id', getStatsForClient)

module.exports = router
