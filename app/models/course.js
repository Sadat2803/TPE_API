const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
	{
		commande: {
			type: String,
			ref: 'Commande',
		},

		type_debut: {
			type: String,
			// required: true,
		},

		date_debut: {
			type: String,
		},

		heure_debut: {
			type: String,
		},

		adresse_debut: {
			type: mongoose.SchemaTypes.Mixed,
		},

		notes_debut: {
			type: String,
		},

		files_debut: [
			{
				type: String,
				ref: 'Media',
				autopopulate: true,
				default: [],
			},
		],

		type_fin: {
			type: String,
			// required: true,
		},

		date_fin: {
			type: String,
		},

		heure_fin: {
			type: String,
		},

		adresse_fin: {
			type: mongoose.SchemaTypes.Mixed,
		},

		notes_fin: {
			type: String,
		},

		files_fin: [
			{
				type: String,
				ref: 'Media',
				autopopulate: true,
				default: [],
			},
		],

		type: {
			type: String,
		},

		date: {
			type: String,
		},

		heure: {
			type: String,
		},

		adresse: {
			type: mongoose.SchemaTypes.Mixed,
		},

		notes: {
			type: String,
		},

		files: [
			{
				type: String,
				ref: 'Media',
				autopopulate: true,
				default: [],
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
)
CourseSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Course', CourseSchema)
