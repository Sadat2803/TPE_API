

const { 
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken
} = require('./helpers')

  const { matchedData } = require('express-validator')
//const { getItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const transporter = require('../../models/user')
const User = require('../../models/user')
const { findTransporter } = require('../../controllers/transporteurs/findTransporter')
/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} User- user object
 */
const suspendUserTransporter = (User = {}) => {
  try {
   // const transporterP = await getItem(req.id, transporter)
//console.log("++++++++++++++++++++++++++++++++++")
//console.log(transporterP)


const data = matchedData(req)
//const transporterP = await findTransporter(data  )

    if(User.suspendre == false)
    {
        user.loginAttempts = 0
       saveLoginAttemptsToDB(user)
      res.status(200).json( saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { suspendUserTransporter }