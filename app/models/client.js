const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ClientSchema = new mongoose.Schema(
	{
		name_entreprise: {
			type: String,
			required: true,
		},
		siret: {
			type: Number,
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
			ref: 'Media',
		},
		kbis: {
			type: String,
			ref: 'Media',
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

ClientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Client', ClientSchema)
