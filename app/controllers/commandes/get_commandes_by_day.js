const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')
const { getItems } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommandesByDay =  async (req, res) => {
	console.log(req.params.id)

	try {
		const result = await getItems(req, Commande, {
			clientID: req.params.id,
			createdAt: { 
				$gte:  new Date(new Date().setHours(0,0,0,0))  
			}
		})
		console.log(result)
		res.status(200).json(result)
	} catch (error) {
		handleError(res, error)
	}
}



module.exports = { getCommandesByDay }
