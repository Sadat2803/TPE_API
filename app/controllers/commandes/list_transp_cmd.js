const Commande = require('../../models/commande')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const listCmdTrans = async (req, res) => {
  try {
    const agg = [
      {
        '$match': {
          'transporterID': {
            '$ne': null
          }, 
          'statut': {
            '$eq': 'terminee'
          }
        }
      }, {
        '$group': {
          '_id': '$transporterID', 
          'commandes': {
            '$addToSet': '$$ROOT'
          }, 
          'total': {
            '$sum': '$prix'
          }
        }
      }, {
        '$lookup': {
          'from': 'transporters', 
          'let': {
            'tid': '$_id'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', {
                      '$toObjectId': '$$tid'
                    }
                  ]
                }
              }
            }
          ], 
          'as': 'transporter'
        }
      }, {
        '$set': {
          'transporterData': {
            '$arrayElemAt': [
              '$transporter', 0
            ]
          }
        }
      }, {
        '$project': {
          'commandes': 0, 
          'transporter': 0
        }
      }
    ]

    const result = await Commande.aggregate(agg)

    res.status(200).json({
      data: result,
      total_all: result.reduce((prev, curr) => prev + curr.commandes, 0)
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { listCmdTrans }
