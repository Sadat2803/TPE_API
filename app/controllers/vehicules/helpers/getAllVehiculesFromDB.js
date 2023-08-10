const Vehicule = require('../../../models/vehicule')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Gets all items from database
 */
const getAllVehiculesFromDB = () => {
  return new Promise((resolve, reject) => {
    Vehicule.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1,
          typevehicule: 1
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
module.exports = { getAllVehiculesFromDB }
