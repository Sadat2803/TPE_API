const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const User = require('./user');

const CommandeSchema = new mongoose.Schema(
	{
		__id: {
			type: String,
			required: true,
		},
		type_commande: {
			type: String,
			required: true,
		},
		temporisation: {
			type: String,
			required: true,
		},
		statut: {
			type: String,
			required: true,
		},

		debut: {
			type: String,
		},
		heure_debut: {
			type: String,
		},
		adresse_debut: {
			type: mongoose.SchemaTypes.Mixed,
		},
		fin: {
			type: String,
		},
		heure_fin: {
			type: String,
		},
		adresse_fin: {
			type: mongoose.SchemaTypes.Mixed,
		},
		heure_jour: {
			type: Number,
		},
		kilo_jour: {
			type: Number,
		},

		nb_jours: {
			type: Number,
		},

		ref_client: {
			type: String,
		},

		type_transport: {
			type: String,
			required: true,
		},

		type_transport_details: {
			type: String,
		},

		options_vehicule_leger: {
			type: Array,
			default: [],
		},

		vehicule_poids_lourds: {
			type: String,
		},

		options_poids_lourds: {
			type: Array,
			default: [],
		},

		courses: [
			{
				type: String,
				ref: 'Course',
				autopopulate: true,
			},
		],

		rippeurs: {
			type: Number,
		},

		manutention: {
			type: Array,
			default: [],
		},

		epi: {
			type: Array,
			default: [],
		},

		prix: {
			type: Number,
			required: true,
		},

		plateforme: {
			type: Boolean,
			default: false,
		},

		recu: {
			type: Boolean,
			default: false,
		},

		salon: {
			type: Boolean,
			default: false,
		},

		transporterID: {
			type: String,
			ref: 'User',
			autopopulate: true,
		},

		chauffeurID: {
			type: String,
			ref: 'User',
			autopopulate: true,
		},

		signalement: {
			type: String,
			ref: 'Signalement',
		},

		type_signalement: {
			type: String,
			default: null,
		},

		signalement_count: {
			type: Number,
			default: 0,
		},

		signaler: {
			type: Boolean,
			default: false,
		},

		clientID: {
			type: String,
			ref: 'User',
			autopopulate: true,
		},

		absolute_start_date: {
			type: Date,
		},

		notes: {
			type: String,
		},

		nature: {
			type: String,
		},

		nbr_palettes: {
			type: Number,
			default: 0,
		},

		palette_desc: {
			type: String,
		},

		nature_desc: {
			type: String,
		},

		livraison: {
			type: String,
		},

		etage: {
			type: Number,
			default: 0,
		},

		type_etage: {
			type: String,
		},

		// assenceur: {
		// 	type: String,
		// },

		assurance: {
			type: String,
		},

		danger: {
			type: String,
		},

		manutention_chauffeur: {
			type: String,
		},

		paymentStatus: {
			type: String,
		},

		paymentNote: {
			type: String,
		},

		assurance_amount: {
			type: String,
		},

		files: [
			{
				type: String,
				ref: 'Media',
				autopopulate: true,
			},
		],

		waypoints: [
			{
				type: mongoose.SchemaTypes.Mixed,
			},
		],

		signed: {
			type: Boolean,
		},

		envelopeId: {
			type: String,
		},

		waypoints_overage: {
			type: Boolean,
			default: false,
		},
		margin: {
			type: Number,
			default: 0,
		},
		createdFrom: {
			type: String,
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

CommandeSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next(); // Skip the pre-save hook for updates
  }

  
  User.findOne({ email: 'admin@admin.com' }, (err, adminUser) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (adminUser) {
      this.margin = adminUser.margin;
    } else {
      console.log("Admin user not found!");
    }

    next();
  });
});


CommandeSchema.plugin(mongoosePaginate)
CommandeSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Commande', CommandeSchema)
