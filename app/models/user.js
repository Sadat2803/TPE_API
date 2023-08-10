const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema(
	{
		__id: {
			type: String,
			required: true,
		},
		societe: {
			type: String,
		},
		siret: {
			type: String,
		},
		quality: {
			type: String,
		},
		first_name: {
			type: String,
			// required: true
		},
		last_name: {
			type: String,
			//  required: true
		},

		sexe: {
			type: String,
			//enum: ['Homme', 'Femme'],
			//required: true,
		},

		type_vehicule: {
			type: Array,
			required: true,
		},

		date_naiss: {
			type: Date,
		},
		date_embauche: {
			type: Date,
		},

		permis: {
			type: Array,
			required: true,
		},

		fimo: {
			type: String,
		},
		danger: {
			type: String,
		},

		_password: {
			type: String,
		},

		rippeurs: {
			type: Number,
		},

		vehicules: {
			type: Array,
			default: [],
		},

		domain: {
			type: String,
		},

		manutention: {
			type: Array,
			default: [],
		},

		epi: {
			type: Array,
			default: [],
		},

		address: {
			type: String,
		},

		status: {
			type: String,
			default: 'en-attente',
		},

		email: {
			type: String,
			validate: {
				validator: validator.isEmail,
				message: 'EMAIL_IS_NOT_VALID',
			},
			lowercase: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'transporter', 'client', 'chauffeur'],
			default: 'user',
		},
		verification: {
			type: String,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
		},
		city: {
			type: String,
		},
		postalCode: {
			type: String,
		},
		suspendre: {
			type: Boolean,
			default: false,
		},
		premium: {
			type: Boolean,
			default: false,
		},
		reduction: {
			type: Number,
			default: 0,
		},
		country: {
			type: String,
		},
		logo: {
			type: String,
			ref: 'Media',
			autopopulate: true,
		},
		kbis: {
			type: String,
			ref: 'Media',
			autopopulate: true,
		},
		transporter: {
			type: String,
			ref: 'User',
			autopopulate: true,
		},
		loginAttempts: {
			type: Number,
			default: 0,
			select: false,
		},
		blockExpires: {
			type: Date,
			default: Date.now,
			select: false,
		},
		location: {
			type: mongoose.SchemaTypes.Mixed,
		},
		margin: {
			type: Number
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const hash = (user, salt, next) => {
	bcrypt.hash(user.password, salt, (error, newHash) => {
		if (error) {
			return next(error)
		}
		user.password = newHash
		return next()
	})
}

const genSalt = (user, SALT_FACTOR, next) => {
	bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		if (err) {
			return next(err)
		}
		return hash(user, salt, next)
	})
}

UserSchema.pre('save', function (next) {
	const that = this
	const SALT_FACTOR = 5
	if (!that.isModified('password')) {
		return next()
	}
	return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
	bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
		err ? cb(err) : cb(null, isMatch)
	)
}
UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('User', UserSchema)
