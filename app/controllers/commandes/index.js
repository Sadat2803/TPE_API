const { createCommande } = require('./create_commande')
const { deleteCommande } = require('./delete_commande')
const { getCommande } = require('./get_commande')
const { updateCommande } = require('./update_commande')
const { getCommandes } = require('./get_commandes')
const { getCommandesByDay } = require('./get_commandes_by_day')
const { getCommandesByMonth } = require('./get_commandes_by_month')
const { affectationCommande } = require('./affectation_commande')
const { getCommandesByTransporter } = require('./get_commande_by_transporter')
const { getCommandesByChauffeur } = require('./getCommandesByChauffeur')
const {
	getCommandeByChauffeurStatus,
} = require('./getCommandeByChauffeurStatus')
const {
	getCommandeByTransporterAffectation,
} = require('./getCommandeByTransporterAffectation')
const { listCmdAffectFalse } = require('./list_cmd_affect_false')
const { listCmdstatTerminer } = require('./listCmd_stat_terminer')
const { listCmdTrans } = require('./list_transp_cmd')

const { getCommandesForPlateForm } = require('./getCommandesForPlateForm')
const { getCommandesAttribuer } = require('./getCommandesAttribuer')
const { getCommandesAnomalies } = require('./getCommandesAnomalies')

const { deleteMultipleCommandes } = require('./deleteMultipleCommandes')

const { getCommandesByClient } = require('./getCommandesByClient')
const { getAllCommandesByClient } = require('./getAllCommandesByClient')

const {
	getCommandesByMonthTransporter,
} = require('./getCommandesByMonthTransporter')

const { getCommandesForTransporter } = require('./getCommandesForTransporter')
const { getCommandesForAdmin } = require('./getCommandesForAdmin')
const { getCommandesForSalon } = require('./getCommandesForSalon')
const { attributionCommandeForSalon } = require('./attributionCommandeForSalon')
const { signCommande } = require('./signCommande')
const { getCommandeSignature } = require('./getCommandeSignature')
const { updateMeilisearch } = require('./updateMeilisearch')

module.exports = {
	createCommande,
	deleteCommande,
	getCommande,
	updateCommande,
	getCommandes,
	getCommandesByDay,
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
	getCommandesByClient,
	getAllCommandesByClient,
	getCommandesByMonthTransporter,
	getCommandesForTransporter,
	getCommandesForAdmin,
	getCommandesForSalon,
	attributionCommandeForSalon,
	getCommandesAnomalies,
	deleteMultipleCommandes,
	signCommande,
	getCommandeSignature,
	updateMeilisearch,
}
