const { itemNotFound } = require('../../middleware/utils')
const Transporter = require('../../models/transporter')
//const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} suspendre - user´s email
 */
const findTransporter = (suspendre = '') => {
  return new Promise((resolve, reject) => {
    Transporter.findOne(
      {
        suspendre
      },
      'password loginAttempts blockExpires name email role verified verification',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findTransporter }
