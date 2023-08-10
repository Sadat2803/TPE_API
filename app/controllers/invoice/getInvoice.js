//const Invoice = require('../../models/tarif')
const { handleError } = require('../../middleware/utils')

const User = require('../../models/user')
const Commande = require('../../models/commande')
var ObjectId = require('mongodb').ObjectId

const invoiceIt = require('@rimiti/invoice-it').default

invoiceIt.configure({
	emitter: {
		name: 'TPE',
		street_number: '',
		street_name: '',
		zip_code: '',
		city: '',
		country: '',
		phone: '',
		mail: '',
		website: '',
	},
	global: {
		logo: 'https://i.ibb.co/kxfWqLJ/tpe-logo-1.png',
		lang: 'fr',
		footer: {
			fr: 'Société TPE',
		},
	},
})

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getInvoice = async (req, res) => {
	try {
		const { type, client, commandes } = req.body

		const clientData = await User.findOne({ _id: client })

		const invoice = invoiceIt.create({
			first_name: clientData.first_name,
			last_name: clientData.last_name,
			// street_number: '20',
			// street_name: 'Rue Victor Hugo',
			// zip_code: '77340',
			// city: 'Pontault-Combault',
			// country: 'France',
			// phone: '06 00 00 00 00',
			// mail: 'will.jameson@customer.com'
		})

		console.log(commandes)

		let commandesData = []

		for (c of commandes) {
			console.log(c)
			const _commande = await Commande.findOne({ _id: c })
			console.log(_commande)
			commandesData.push(_commande)
		}

		console.log(commandesData)

		if (type === 'month') {
		} else {
		}

		invoice.article = commandesData.map((item) => ({
			description: `Transport ${item._id}`,
			tax: 0,
			price: item.prix,
			qt: 1,
		}))

		const id = `${Date.now()}`

		await invoice
			.getInvoice()
			.toPDF()
			.toFile(`${process.env.PWD}/public/media/${id}.pdf`)

		return res.status(201).json({
			invoice: id,
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getInvoice }
