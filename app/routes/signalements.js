const express = require('express')
const router = express.Router()

const {
	createSignalement,
	deleteSignalement,
	getSignalements,
	updateSignalement,
	getSignalement,
	getSignalementbyChauffeurId,
} = require('../controllers/signalements')

router.post('/', createSignalement)
router.delete('/:id', deleteSignalement)
router.get('/commande/:id', getSignalements)
router.get('/:id', getSignalement)
router.patch('/:id', updateSignalement)
router.get('/', getSignalements)
router.get('/signalementByChauffeur/:id', getSignalementbyChauffeurId)

module.exports = router
