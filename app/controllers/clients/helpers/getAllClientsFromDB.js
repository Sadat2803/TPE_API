const Client = require('../../../models/client')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Gets all items from database
 */
const getAllClientsFromDB = () => {
  return new Promise((resolve, reject) => {
    Client.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
            name_entreprise: 1
            
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
module.exports = { getAllClientsFromDB }