const { handleError } = require('../../middleware/utils')
const docusign = require('docusign-esign')
const fs = require('fs')
const path = require('path')

const axios = require('axios')
const FormData = require('form-data')

const Commande = require('../../models/commande')

const getToken = async () => {
	const data = new FormData()
	data.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer')
	data.append(
		'assertion',
		'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlMjdjY2UyOC04MWIyLTQ3YzAtOTgyMS01NWVlNGY4MWZlMDQiLCJzdWIiOiI4YTFiYWUyYS0yODk4LTRkMWQtYjI4OC0wZGVhZDZhOTlkYmIiLCJhdWQiOiJhY2NvdW50LWQuZG9jdXNpZ24uY29tIiwiaWF0IjoxNTk4MzgzMTIzLCJleHAiOjE2NzY2ODk1OTUsInNjb3BlIjoic2lnbmF0dXJlIGltcGVyc29uYXRpb24ifQ.kiykOYEuY8C9dEoGNt-R8ItRqGMlX4CG13XlUrHmfLBLpslM5aJWoD2Nyeo1TES6cas2XvwNgonW0tFswvz5m-3iE-FcADHt90I_2sCtjXestWU_1dqFScZJZaN6_eHeJ9IEA76JRfNXJk3VvgRYq_bwFcxdj32deomCUL1EPuyWlhy28FzQuaXqAgPLGVhFMDiQMEiScaNAgFnTiWm_8J-sSYsd_9A5vjALLKuIjZ-yuk9RU0fnxBpbM4d0aXqrvgJyVUdPTrxR9X5uqGvWPWgwVCaw4RmVNkcPDFeWv06xpjn74mpdAFCmn1Ip77m53Kg3lTRiPTvnkgCjGjObzQ'
	)

	var config = {
		method: 'post',
		url: 'https://account-d.docusign.com/oauth/token',
		headers: {
			...data.getHeaders(),
		},
		data: data,
	}

	const result = await axios(config)

	return result.data
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommandeSignature = async (req, res) => {
	try {
		const commandeId = req.params.id

		const commande = await Commande.findOne({ _id: commandeId })

		const { envelopeId } = commande

		const { access_token } = await getToken()

		const result = await axios({
			method: 'get',
			url: `https://demo.docusign.net/restapi/v2.1/accounts/6ad7c813-9362-46d9-8bc3-db236a546b33/envelopes/${envelopeId}/documents/combined`,
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
			responseType: 'stream',
		})

		return result.data.pipe(res)

		//return res.status(200).json({ envelopeId, access_token })
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { getCommandeSignature }
