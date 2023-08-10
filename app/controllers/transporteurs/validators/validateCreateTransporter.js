const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateTransporter = [
  check('name_entreprise')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('siret')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('first_name')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('last_name')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('quality')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  
  check('activity')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('adress')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('phone')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  
  
  check('email')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isEmail()
  .withMessage('EMAIL_IS_NOT_VALID')
  .trim(),
  check('password')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isLength({
    min: 5
  })
  .withMessage('PASSWORD_TOO_SHORT_MIN_5')
  .trim(),
  check('logo')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('kbis')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('vehicules')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('chauffeurs')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  check('commande')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  /*check('statut_transporter')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),*/
  
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateTransporter }