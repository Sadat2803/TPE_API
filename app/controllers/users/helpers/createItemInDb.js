const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = ({
  societe = '',
  siret = '',

  first_name = '',
  last_name = '',
  email = '',
  password = '',
  role = '',
  phone = '',
  city = '',
  country = '',
  kbis = '',
  logo = ''
}) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      societe,
      siret,
      first_name,
      last_name,
      email,
      password,
      role,
      phone,
      city,
      country,
      kbis,
      logo,
      verification: uuid.v4()
    })
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }

      item = JSON.parse(JSON.stringify(item))

      delete item.password
      delete item.blockExpires
      delete item.loginAttempts

      resolve(item)
    })
  })
}

module.exports = { createItemInDb }
