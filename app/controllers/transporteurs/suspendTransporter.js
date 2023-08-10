const { matchedData } = require('express-validator')
const { getItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const transporter = require('../../models/transporter')
//const transporter = require('../../models/transporter')
const { Transporter } = require('../../models/transporter')
const { getTransporter } = require('./getTransporter')
/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const suspendTransporter = async (req, res) => {
  try {
   // const transporterP = await getItem(req.id, transporter)
    const transporterP = await getTransporter(req.email)
console.log("++++++++++++++++++++++++++++++++++")
console.log(transporterP)
    if(transporterP.suspendre)
    {
        user.loginAttempts = 0
        await saveLoginAttemptsToDB(user)
        res.status(200).json(await saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { suspendTransporter }