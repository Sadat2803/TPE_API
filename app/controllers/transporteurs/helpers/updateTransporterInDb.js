const Transporter = require('../../../models/transporter')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateTransporterInDb = (req = {}, id = '') => {
  return new Promise((resolve, reject) => {
    Transporter.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        select: '-role -statut_transporter -_id -updatedAt -createdAt'
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { updateTransporterInDb }
