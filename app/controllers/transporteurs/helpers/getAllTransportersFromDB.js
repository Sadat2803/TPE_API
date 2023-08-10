const transporter = require('../../../models/transporter')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Gets all items from database
 */
const getAllTransportersFromDB = () => {
  return new Promise((resolve, reject) => {
    transporter.find(
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
module.exports = { getAllTransportersFromDB }