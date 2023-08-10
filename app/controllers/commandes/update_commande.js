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
const updateCommande = async (req, res) => {
	try {
		req = matchedData(req)

		const id = await isIDGood(req.id)

		const commandeData = await Commande.findOne({ _id: id })
		.populate('clientID transporterID chauffeurID courses files file')
		.lean()

		//console.log(commandeData)

		const extraCommandeData = {
			...commandeData,
			client_id: commandeData.clientID._id,
			client_societe: commandeData.clientID.societe,
			client_first_name: commandeData.clientID.first_name,
			client_last_name: commandeData.clientID.last_name,

			transporter_id: commandeData.transporterID
				? commandeData.transporterID._id
				: '',
			transporter_societe: commandeData.transporterID
				? commandeData.transporterID.societe
				: '',
			transporter_first_name: commandeData.transporterID
				? commandeData.transporterID.first_name
				: '',
			transporter_last_name: commandeData.transporterID
				? commandeData.transporterID.last_name
				: '',
				absolute_start_date_unix: moment(
					commandeData.absolute_start_date
				).unix(),		}

		console.log(extraCommandeData)

		const res2 = await axios({
			method: 'PUT',
			url: 'http://141.94.27.46:7701/indexes/commandes/documents',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer BZAM9d7V9fecb50be7ebd07ef01bba41f77ce15b2ee07a27d4201eb1b9c81fe9cb727c68',
			},
			data: JSON.stringify([extraCommandeData]),
		})

		//console.log(res2)

		res.status(200).json(await updateItem(id, Commande, req))
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { updateCommande }
