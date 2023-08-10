const Commande = require('../../models/commande')
const Course = require('../../models/course')
const { handleError } = require('../../middleware/utils')
const axios = require('axios')
const moment = require('moment')

const { customAlphabet } = require('nanoid')
const alphabet = '0123456789'
const nanoid = customAlphabet(alphabet, 9)

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCommande = async (req, res) => {
	try {
		let data = { ...req.body, __id: nanoid() }

		delete data.courses
		// if(!data.heure_debut) {
		// 	data.heure_debut = moment(data.heure_debut).format('hh:mm')
		// }
		// if(!data.heure_fin) {
		// 	data.heure_fin = moment(data.heure_fin).format('hh:mm')
		// }

		if (data.type_commande == 'course-a-course') {
			const commande = await Commande.create(data)

			let courses = []

			for (let item of req.body.courses) {

				// if(!item.heure_debut) {
				// 	item.heure_debut = moment(item.heure_debut).format('hh:mm')
				// }
				// if(!item.heure_fin) {
				// 	item.heure_fin = moment(item.heure_fin).format('hh:mm')
				// }
				// if(!item.heure) {
				// 	item.heure = moment(item.heure).format('hh:mm')
				// }

				
				const c = await Course.create({
					...item,
					commande: commande._id,
				})

				courses.push(c._id)
			}

			const result = await Commande.findByIdAndUpdate(
				commande._id,
				{
					courses: courses,
				},
				{
					new: true,
				}
			)
			.populate('clientID transporterID chauffeurID courses files file')
			.lean()

				try {

					let data = {
						...result,
		
						client_id: result.clientID._id,
						client_societe: result.clientID.societe,
						client_first_name: result.clientID.first_name,
						client_last_name: result.clientID.last_name,
		
						transporter_id: result.transporterID
							? result.transporterID._id
							: '',
						transporter_societe: result.transporterID
							? result.transporterID.societe
							: '',
						transporter_first_name: result.transporterID
							? result.transporterID.first_name
							: '',
						transporter_last_name: result.transporterID
							? result.transporterID.last_name
							: '',
						absolute_start_date_unix: moment(
							result.absolute_start_date
						).unix(),
					}

                    // send hour and date in this format 
					// if(!data.heure_debut) {
					// 	data.heure_debut = moment(data.heure_debut).format('hh:mm')
					// }
					// if(!data.heure_fin) {
					// 	data.heure_fin = moment(data.heure_fin).format('hh:mm')
					// }
					// if(!data.heure) {
					// 	data.heure = moment(data.heure).format('hh:mm')
					// }
	

					console.log("milsearch insert commande course-a-course");

				await axios({
					method: 'POST',
					url: 'http://141.94.27.46:7701/indexes/commandes/documents',
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer BZAM9d7V9fecb50be7ebd07ef01bba41f77ce15b2ee07a27d4201eb1b9c81fe9cb727c68',
					},
					data: JSON.stringify(data),
				}).catch(error => console.log(error))
				
				} catch (error) {
					reject(error)
				}

			return res.status(201).json(result)
		} else {

			console.log("did get inside else not 'course a course' ");
			
			const commande = await Commande.create(data)
			const result = await Commande.findById(commande._id)
				.populate('clientID transporterID chauffeurID courses files file')
				.lean()

			console.log(result);

			try {
				let data = {
					...result,
	
					client_id: result.clientID._id,
					client_societe: result.clientID.societe,
					client_first_name: result.clientID.first_name,
					client_last_name: result.clientID.last_name,
	
					transporter_id: result.transporterID
						? result.transporterID._id
						: '',
					transporter_societe: result.transporterID
						? result.transporterID.societe
						: '',
					transporter_first_name: result.transporterID
						? result.transporterID.first_name
						: '',
					transporter_last_name: result.transporterID
						? result.transporterID.last_name
						: '',
					absolute_start_date_unix: moment(
						result.absolute_start_date
					).unix(),
				}

				console.log("milsearch insert commande course-a-course");


			await axios({
				method: 'POST',
				url: 'http://141.94.27.46:7701/indexes/commandes/documents',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer BZAM9d7V9fecb50be7ebd07ef01bba41f77ce15b2ee07a27d4201eb1b9c81fe9cb727c68',
				},
				data: JSON.stringify(data),
			}).catch(error => console.log(error))

			
			} catch (error) {
				reject(error)
			}

			return res.status(201).json(commande)
		}
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { createCommande }
