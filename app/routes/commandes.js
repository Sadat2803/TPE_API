const express = require('express')
const {
	validateUpdateCommande,
} = require('../controllers/cities/validators/validateUpdateCommande')
const router = express.Router()

const {
	createCommande,
	deleteCommande,
	getCommande,
	updateCommande,
	getCommandes,
	getCommandesByMonth,
	affectationCommande,
	getCommandesByTransporter,
	getCommandesByChauffeur,
	getCommandeByChauffeurStatus,
	getCommandeByTransporterAffectation,
	listCmdAffectFalse,
	listCmdstatTerminer,
	listCmdTrans,
	getCommandesForPlateForm,
	getCommandesAttribuer,
	getCommandesAnomalies,
	getCommandesByClient,
	getAllCommandesByClient,
	getCommandesByMonthTransporter,
	getCommandesForTransporter,
	getCommandesForAdmin,
	getCommandesForSalon,
	attributionCommandeForSalon,
	signCommande,
	getCommandeSignature,
	updateMeilisearch,
	getCommandesByDay,
} = require('../controllers/commandes')
const {
	attributionCommande,
} = require('../controllers/commandes/attribution_commande')
const {
	marginCommande
} = require('../controllers/commandes/marginCommande')
const {
	deleteMultipleCommandes,
} = require('../controllers/commandes/deleteMultipleCommandes')
const {
	validateGetCommandesByTransporter,
} = require('../controllers/commandes/validators/validateGetCommandesByTransporter')
const {
	validateSignCommande,
} = require('../controllers/commandes/validators/validateSignCommande')

router.post('/', createCommande)
//http://localhost:3001/meilisearch
router.get('/meilisearch', updateMeilisearch)
router.delete('/:id', deleteCommande)

router.post('/delete', deleteMultipleCommandes)

router.get('/plateforme', getCommandesForPlateForm)
router.get('/attribuer', getCommandesAttribuer)
router.get('/anomalies', getCommandesAnomalies)

router.post('/attribution', attributionCommande)
router.post('/margin', marginCommande)
router.post('/salon', attributionCommandeForSalon)

router.get('/foradmin', getCommandesForAdmin)
router.get('/salon', getCommandesForSalon)
router.get('/:id', getCommande)
router.patch('/:id', validateUpdateCommande, updateCommande)
router.get('/', getCommandes)
router.get('/list/affect', listCmdAffectFalse)
router.get('/list/stat/terminer', listCmdstatTerminer)
router.get('/client/:id/all/month', getCommandesByMonth)
router.get('/client/:id/all/day', getCommandesByDay)
router.get('/transporter/:id/all/month', getCommandesByMonthTransporter)

router.patch('/affectation/:id', affectationCommande)
router.get(
	'/bytransporter/:id',
	validateGetCommandesByTransporter,
	getCommandesByTransporter
)
router.get('/byChauffeur/:id', getCommandesByChauffeur)
router.get('/byChauffeurstatus/:id', getCommandeByChauffeurStatus)
router.get('/byTransporterAffect/:id', getCommandeByTransporterAffectation)
router.get('/listTransporterCMD/all', listCmdTrans)

router.get('/client/:id', getCommandesByClient)
router.get('/client/:id/all', getAllCommandesByClient)

router.get('/transporter/:id', getCommandesByTransporter)

router.get('/fortransporter/:id', getCommandesForTransporter)

router.post('/:id/sign', validateSignCommande, signCommande)
router.get('/:id/sign/pdf', validateSignCommande, getCommandeSignature)

module.exports = router
