const express = require('express')
const router = express.Router()
require('../../config/passport')

const { getStats, getStatsForClient } = require('../controllers/stats')
const {
	validateGetStatsForClientID,
} = require('../controllers/stats/validators')

router.get('/', getStats)
router.get('/:id', getStatsForClient)

module.exports = router
