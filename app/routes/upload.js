const express = require('express')
const router = express.Router()

const { uploadMedia } = require('../controllers/media')

router.post('/one', uploadMedia)

module.exports = router
