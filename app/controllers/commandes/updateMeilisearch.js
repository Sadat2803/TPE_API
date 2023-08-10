const Commande = require('../../models/commande')
const { updateItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const axios = require('axios')
const moment = require('moment')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateMeilisearch = async (req, res) => {
	try {
		req = matchedData(req)

		const commandes = await Commande.find({})
			.populate('clientID transporterID chauffeurID courses files file')
			.lean()

		for (let commande of commandes) {
			await axios({
				method: 'POST',
				url: 'http://141.94.27.46:7701/indexes/commandes/documents',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer BZAM9d7V9fecb50be7ebd07ef01bba41f77ce15b2ee07a27d4201eb1b9c81fe9cb727c68',
				},
				data: JSON.stringify({
					...commande,

					client_id: commande.clientID._id,
					client_societe: commande.clientID.societe,
					client_first_name: commande.clientID.first_name,
					client_last_name: commande.clientID.last_name,

					transporter_id: commande.transporterID
						? commande.transporterID._id
						: '',
					transporter_societe: commande.transporterID
						? commande.transporterID.societe
						: '',
					transporter_first_name: commande.transporterID
						? commande.transporterID.first_name
						: '',
					transporter_last_name: commande.transporterID
						? commande.transporterID.last_name
						: '',
					absolute_start_date_unix: moment(
						commande.absolute_start_date
					).unix(),
				}),
			})
		}

		res.status(200).json({ status: 'ok' })
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { updateMeilisearch }
