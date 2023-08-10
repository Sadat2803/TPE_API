const Transporter = require('../../../models/transporter')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} siret - name of item
 */
const TransportersExists = (siret = '') => {
  return new Promise((resolve, reject) => {
    Transporter.findOne(
      {
        siret
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

module.exports = { TransportersExists }
