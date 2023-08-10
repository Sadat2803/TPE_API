const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const validator = require('validator')

const ChauffeurSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		adresse: {
			type: String,
			required: true,
		},
		sexe: {
			type: String,
			enum: ['Homme', 'Femme'],
			required: true,
		},
		type_vehicule: {
			type: String,
			// enum: ['Véhicule Léger', 'Poids lourds'],
			// required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			validate: {
				validator: validator.isEmail,
				message: 'EMAIL_IS_NOT_VALID',
			},
			lowercase: true,
			required: true,
		},
		date_naiss: {
			type: Date,
			required: true,
		},
		date_embauche: {
			type: Date,
			required: true,
		},
		permis: {
			type: String,
			enum: ['Léger', 'Lourds', 'Super Lourds'],

			required: true,
		},
		fimo: {
			type: Boolean,
			required: true,
		},
		danger: {
			type: Boolean,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		transporterID: {
			type: String,
			ref: 'Transporter',
		},
		location: {
			lat: Number,
			lng: Number,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

ChauffeurSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Chauffeur', ChauffeurSchema)
