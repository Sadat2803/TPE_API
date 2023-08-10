const { createChauffeur } = require('./createChauffeur')
const { deleteChauffeur } = require('./deleteChauffeur')
const { getAllChauffeurs } = require('./getAllChauffeurs')
const { getChauffeur } = require('./getChauffeur')
const { updateChauffeur } = require('./updateChauffeur')
const { getChauffeurByTransporter } = require('./getChauffeurByTransporter')
const { updateLocationChauffeur } = require('./updateLocationChauffeur')

module.exports = {
	createChauffeur,
	deleteChauffeur,
	getAllChauffeurs,
	getChauffeur,
	updateChauffeur,
	getChauffeurByTransporter,
	updateLocationChauffeur,
}
