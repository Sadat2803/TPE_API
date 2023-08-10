const Signalement = require('../../models/signalement')
const { handleError } = require('../../middleware/utils')
const { checkQueryString, getItems } = require('../../middleware/db')
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getSignalementbyChauffeurId = async (req, res) => {
    try {  
   /*   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")

    const commandes = await mongoose.Schema({ transporterID: req.params.transporterID, status: String})
    console.log("bbbbbbbbbbbbbbbbbbbbbb")

    console.log(req.params.transporterID)
    commandes.plugin(mongoosePaginate);
     
    const Commande = mongoose.model('Commande',  commandes);
     //   res.status(200).json(await getItems(req, Commande, query))
     Commande.paginate().then({
      transporterID: req.params.transporterID,
       status: 'terminee'
     }) // Usage
     */

        res.status(200).json(await getItems(req , Signalement, {chauffeurId: req.params.chauffeurId}
          )
        )
      }
     catch (error) {
        handleError(res, error)
      }
}

module.exports = { getSignalementbyChauffeurId }
