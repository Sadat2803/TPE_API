const Client = require('../../../models/client')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateClientsInDB = (req = {}, id = '') => {
  return new Promise((resolve, reject) => {
    Client.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
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

module.exports = { updateClientsInDB }