const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Media', MediaSchema)
