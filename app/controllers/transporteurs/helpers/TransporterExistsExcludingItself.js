const Transporter = require('../../../models/transporter')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name_entreprise - name of item
 */
const TransporterExistsExcludingItself = (id = '', name_entreprise = '') => {
  return new Promise((resolve, reject) => {
    Transporter.findOne(
      {
        name_entreprise,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'Transporter_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { TransporterExistsExcludingItself }
