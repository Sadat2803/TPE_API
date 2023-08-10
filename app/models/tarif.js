const mongoose = require('mongoose')

const TarifSchema = mongoose.Schema(
	{
		BREAK: {
			type: mongoose.SchemaTypes.Mixed,
		},
		F12: {
			type: mongoose.SchemaTypes.Mixed,
		},
		F14: {
			type: mongoose.SchemaTypes.Mixed,
		},
		F20: {
			type: mongoose.SchemaTypes.Mixed,
		},
		V7_5T: {
			type: mongoose.SchemaTypes.Mixed,
		},
		V12T: {
			type: mongoose.SchemaTypes.Mixed,
		},
		V19T: {
			type: mongoose.SchemaTypes.Mixed,
		},
		TRACTEUR: {
			type: mongoose.SchemaTypes.Mixed,
		},
		SEMI: {
			type: mongoose.SchemaTypes.Mixed,
		},
		TRACTEUR_SEMI: {
			type: mongoose.SchemaTypes.Mixed,
		},
		FACTURATION_HEURES_D_ATTENTE: {
			type: Number,
		},
		FACTURATION_DEPASSEMENT_MISE_A_DISPO: {
			type: Number,
		},
		TYPE: {
			type: String,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

module.exports = mongoose.model('Tarif', TarifSchema)
