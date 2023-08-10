const { validateCreateChauffeur } = require('./validateCreateChauffeur')
const { validateDeleteChauffeur } = require('./validateDeleteChauffeur')
const { validateGetChauffeur } = require('./validateGetChauffeur')
const { validateUpdateChauffeur } = require('./validateUpdateChauffeur')
const {
	validateUpdateLocationChauffeur,
} = require('./validateUpdateLocationChauffeur')

module.exports = {
	validateCreateChauffeur,
	validateDeleteChauffeur,
	validateGetChauffeur,
	validateUpdateChauffeur,
	validateUpdateLocationChauffeur,
}
