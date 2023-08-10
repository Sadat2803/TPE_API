const { handleError } = require('../../middleware/utils')
const axios = require('axios')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getDistance = async (req, res) => {
	try {
		const origin = req.query.origin
		const destination = req.query.destination
		const apiKey = 'AIzaSyB5Ah3pygC_FWu0WutJvOgPCL9rhk2Mrps'

		const result = await axios({
			method: 'GET',
			url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${origin}&destinations=place_id:${destination}&key=${apiKey}`,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		res.status(200).json(result.data)
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getDistance }
