const Chauffeur = require('../../../models/chauffeur')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllChauffeursFromDB = () => {
  return new Promise((resolve, reject) => {
    Chauffeur.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          first_name: 1
        
        }
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

module.exports = { getAllChauffeursFromDB }
