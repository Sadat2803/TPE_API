const Chauffeur = require('../../../models/chauffeur')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} first_name - name of item
 * @param {string} last_name - name of item
 * @param {string} adresse - name of item
 */
const chauffeurExists = (first_name = '', last_name='', adresse='') => {
  return new Promise((resolve, reject) => {
    Chauffeur.findOne(
      {
        first_name,
        last_name,
        adresse
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'Chauffeur_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { chauffeurExists }
