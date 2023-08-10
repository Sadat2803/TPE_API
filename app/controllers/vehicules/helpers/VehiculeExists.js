const Vehicule = require('../../../models/vehicule')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const vehiculeExists = (name = '') => {
  return new Promise((resolve, reject) => {
    Vehicule.findOne(
      {
        name
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'Vehicule_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { vehiculeExists }