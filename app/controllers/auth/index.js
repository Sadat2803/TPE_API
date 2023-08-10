const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { register } = require('./register')
const { resetPassword } = require('./resetPassword')
const { roleAuthorization } = require('./roleAuthorization')
const { verify } = require('./verify')
const { suspendUserTransporter } = require('./suspendUserTransporter')
const { findTransporter } = require('../../controllers/transporteurs/findTransporter')

module.exports = {
  forgotPassword,
  getRefreshToken,
  login,
  register,
  resetPassword,
  roleAuthorization,
  verify,
  suspendUserTransporter,
  findTransporter
}
