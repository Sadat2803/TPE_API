const Transporter = require('../../models/transporter')
//const { checkQueryString, getItems } = require('../../middleware/db')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { getItem } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTransporter = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Transporter))
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { getTransporter }