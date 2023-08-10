const Client = require('../../../models/client')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const ClientsExistsExcludingItself = (id = '', name_entreprise = '') => {
  return new Promise((resolve, reject) => {
    Client.findOne(
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
          return reject(buildErrObject(422, 'Client_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { ClientsExistsExcludingItself }
