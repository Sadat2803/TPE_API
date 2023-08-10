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
const getInvoiceForOneCommande = async (req, res) => {
	try {
		const { client, commande } = req.body

		const clientData = await User.findOne({ _id: client })

		const invoice = invoiceIt.create({
			first_name: clientData.first_name,
			last_name: clientData.last_name,
		})

		const commandeData = await Commande.findOne({ _id: commande })

		invoice.article = [
			{
				description: `Transport ${commandeData._id}`,
				tax: 0,
				price: commandeData.prix,
				qt: 1,
			},
		]

		await invoice
			.getInvoice()
			.toPDF()
			.toFile(`${process.env.PWD}/public/media/${commandeData._id}.pdf`)

		return res.status(201).json({
			invoice: commandeData._id,
		})
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getInvoiceForOneCommande }
