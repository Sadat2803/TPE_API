const Chauffeur = require('../../../models/chauffeur')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} first_name - first_name of item
 * @param {string} last_name - last_name of item
 * @param {string} adresse - adress of item
 */
const chauffeurExistsExcludingItself = (id = '', first_name = '', last_name='', adresse='' ) => {
  return new Promise((resolve, reject) => {
    City.findOne(
      {
        first_name,
        last_name,
        adresse,
        _id: {
          $ne: id
        }
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

module.exports = { chauffeurExistsExcludingItself }
