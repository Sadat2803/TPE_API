const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SignalementSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			default: null,
		},
		duration: {
			type: String,
			default: '00:00',
		},
		note: {
			type: String,
			required: true,
		},
		files: [
			{
				type: String,
				ref: 'Media',
				autopopulate: true,
			},
		],
		commande: {
			type: String,
			ref: 'Commande',
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

SignalementSchema.plugin(mongoosePaginate)
SignalementSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Signalement', SignalementSchema)
