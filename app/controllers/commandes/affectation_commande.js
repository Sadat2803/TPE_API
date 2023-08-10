const Commande = require('../../models/commande')
const Course = require('../../models/course')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const affectationCommande = async (req, res) => {
  try {
    for (const item of req.body.commandes) {
      const commandes = await Commande.findByIdAndUpdate(
        item,
         {
           transporter: req.body.transporter,
           plateforme : true

        }
      )
console.log(req.body.transporter)
    res.status(200).json(
      {
        result:{

        }
    })
  }
} 
  catch (error) {
    handleError(res, error)
  }
}

module.exports = { affectationCommande }
