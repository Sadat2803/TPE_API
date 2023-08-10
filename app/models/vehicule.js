const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const VehiculeSchema = new mongoose.Schema(
    {
      type_transport: {
          type: String,
          enum: ['Véhicule Léger', 'Pois Lourds','Break', 'fourgon 12m',
          'fourgon 14m', 'fourgon 20m'],

          required: true
        },

        options_vehicule_leger: {
          type: String,
          enum: ['Frigorifique', 'Bachée','Tall','Hayon','7.5 Tonnes', '12 Tonnes','19 Tonnes ',
        'Tracteur + semi', 'Semi', 'Tracteur'],

          required: true
        },
        options_poids_lourds: {
          type: String,
          enum: ['Frigorifique', 'Bachée','Tall','Hayon'],

          required: true
        },
        nbr_vehicule: {
          type: Number,
          

          required: true
        },
        Transporter: {
          type: String,
          ref: 'Transporter',
          required: true
        },
      },
      {
        versionKey: false,
        timestamps: true
      }
)

VehiculeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Vehicule', VehiculeSchema)
