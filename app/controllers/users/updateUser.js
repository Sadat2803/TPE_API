const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')
const { emailExistsExcludingMyself } = require('../../middleware/emailer')

const admin = require('firebase-admin')
const serviceAccount = require('../../../firebase.json')

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const moment = require('moment')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL:
		'https://tpe-tracking-default-rtdb.europe-west1.firebasedatabase.app',
})

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'noreply.tpe.wayne@gmail.com',
		pass: 'sjuujvgocfvmsfxv',
	},
})

// point to the template folder
const handlebarOptions = {
	viewEngine: {
		partialsDir: path.resolve('./views/'),
		defaultLayout: false,
	},
	viewPath: path.resolve('./views/'),
}

transporter.use('compile', hbs(handlebarOptions))

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
	try {
		req = matchedData(req)
		const id = await isIDGood(req.id)
		const doesEmailExists = await emailExistsExcludingMyself(id, req.email)

		if (!doesEmailExists) {
			const user = await updateItem(id, User, req)
			const fullUser = await User.findOne({ _id: req.id })

			if (req.password) {
				fullUser.password = req.password

				await fullUser.save()
			}

			if (user.role === 'chauffeur' && req.location) {
				const db = admin.database()
				const ref = db.ref(`/chauffeurs/${id}`)

				await ref.update({
					_id: id,
					lat: req.location.lat,
					lng: req.location.lng,
				})
			}
			const status = req.status|| 500;
			if (status) {
				let content = ''

				// if (req.status === 'ok') {
				// 	content = `Bonjour ${
				// 		fullUser.last_name
				// 	},<br/>À la date du ${moment(fullUser.createdAt).format(
				// 		'DD/MM/YYYY'
				// 	)} en tant que représentants de la société ${
				// 		fullUser.societe
				// 	} vous avez créer un compte sur La Plate-forme du transport.<br/>Nous avons le plaisir de vous informer que votre compte à été validé et votre accès activer. Vous pouvez dès à présent vous connecter à votre accès sur La Plate-forme du transport grâce à votre identifiant mail et mot de passe que vous avez renseigné lors de votre inscription.<br/>Nous vous souhaitons une bonne navigation et un bon développement sur La Plate-forme du Transport !<br/>L'équipe technique.`
				// } else {
				// 	content = `Bonjour ${
				// 		fullUser.last_name
				// 	},<br/>À la date du ${moment(fullUser.createdAt).format(
				// 		'DD/MM/YYYY'
				// 	)} en tant que représentants de la société ${
				// 		fullUser.societe
				// 	} vous avez créer un compte sur La Plate-forme du transport.<br/>Nous avons le regret de vous informer que votre inscription n'a pas été retenu par nos équipes.<br/>Nous vous souhaitons une bonne continuation et beaucoup de réussite.<br/>L'équipe technique.`
				// }

				const mailOptions = {
					from: 'noreply.tpe.wayne@gmail.com',
					to: fullUser.email,
					subject: 'Validation Compte Transporteur',
					template:
					status === 'ok'
							? 'ok_transporter'
							: 'ko_transporter',
					context: {
						name: fullUser.last_name,
						date: moment(fullUser.createdAt).format('DD/MM/YYYY'),
						company: fullUser.societe,
					},
				}

				await transporter.sendMail(mailOptions)
			}

			res.status(200).json(user)
		}
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { updateUser }
