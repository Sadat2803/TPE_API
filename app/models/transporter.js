const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TransporterSchema = new mongoose.Schema(
	{
		name_entreprise: {
			type: String,
			required: true,
		},
		siret: {
			type: String,
			required: true,
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		quality: {
			type: String,
			required: true,
		},
		activity: {
			type: String,
			required: true,
		},
		adress: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: false,
		},
		 postalCode: {
			type: String,
			required: false,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
			required: true,
		},

		kbis: {
			type: String,
			required: true,
		},
		vehicules: {
			type: String,
			required: true,
		},

		chauffeurs: {
			type: String,
			required: true,
		},

		commande: {
			type: String,
			required: true,
		},

		statut_transporter: {
			type: String,
			enum: ['new', 'valider', 'refuser'],
			default: 'new',
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)
TransporterSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Transporter', TransporterSchema)
