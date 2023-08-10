const express = require('express')
const {
	validateGetDistance,
} = require('../controllers/distance/validators/validateGetDistance')

const router = express.Router()

const { getDistance } = require('../controllers/distance')

router.get('/', validateGetDistance, getDistance)

module.exports = router
