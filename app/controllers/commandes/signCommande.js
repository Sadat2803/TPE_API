const { handleError } = require('../../middleware/utils')
const docusign = require('docusign-esign')
const fs = require('fs')
const path = require('path')

const axios = require('axios')
const FormData = require('form-data')

const Commande = require('../../models/commande')

const makeEnvelope2 = ({ signerEmail, signerName, signerClientId }) => {
	let docPdfBytes

	// read file from a local directory

	// The read could raise an exception if the file is not available!
	const demoDocsPath = path.resolve(__dirname, '../../../docusign')

	docPdfBytes = fs.readFileSync(path.resolve(demoDocsPath, 'sign.pdf'))

	// create the envelope definition

	let env = new docusign.EnvelopeDefinition()

	env.emailSubject = 'Please sign this document'

	// add the documents

	let doc1 = new docusign.Document(),
		doc1b64 = Buffer.from(docPdfBytes).toString('base64')

	doc1.documentBase64 = doc1b64

	doc1.name = 'commande livre' // can be different from actual file name

	doc1.fileExtension = 'pdf'

	doc1.documentId = '3'

	// The order in the docs array determines the order in the envelope

	env.documents = [doc1]

	// Create a signer recipient to sign the document, identified by name and email

	// We set the clientUserId to enable embedded signing for the recipient

	// We're setting the parameters via the object creation

	let signer1 = docusign.Signer.constructFromObject({
		email: signerEmail,

		name: signerName,

		clientUserId: signerClientId,

		recipientId: 1,
	})

	// Create signHere fields (also known as tabs) on the documents,

	// We're using anchor (autoPlace) positioning

	//

	// The DocuSign platform seaches throughout your envelope's

	// documents for matching anchor strings.

	let signHere1 = docusign.SignHere.constructFromObject({
		anchorString: '/sn1/',

		anchorYOffset: '200',
		anchorUnits: 'pixels',

		anchorXOffset: '20',
	})

	// Tabs are set per recipient / signer

	let signer1Tabs = docusign.Tabs.constructFromObject({
		signHereTabs: [signHere1],
	})

	signer1.tabs = signer1Tabs

	// Add the recipient to the envelope object

	let recipients = docusign.Recipients.constructFromObject({
		signers: [signer1],
	})

	env.recipients = recipients

	// Request that the envelope be sent by setting |status| to "sent".

	// To request that the envelope be created as a draft, set to "created"

	env.status = 'sent'

	return env
}

const makeRecipientViewRequest = ({
	envelopeId,
	dsReturnUrl,
	signerEmail,
	signerName,
	signerClientId,
	dsPingUrl,
}) => {
	let viewRequest = new docusign.RecipientViewRequest()

	// Set the url where you want the recipient to go once they are done signing
	// should typically be a callback route somewhere in your app.
	// The query parameter is included as an example of how
	// to save/recover state information during the redirect to
	// the DocuSign signing ceremony. It's usually better to use
	// the session mechanism of your web framework. Query parameters
	// can be changed/spoofed very easily.
	viewRequest.returnUrl = dsReturnUrl + `?envelopeId=${envelopeId}`

	// How has your app authenticated the user? In addition to your app's
	// authentication, you can include authenticate steps from DocuSign.
	// Eg, SMS authentication
	viewRequest.authenticationMethod = 'none'

	// Recipient information must match embedded recipient info
	// we used to create the envelope.
	viewRequest.email = signerEmail
	viewRequest.userName = signerName
	viewRequest.clientUserId = signerClientId

	// DocuSign recommends that you redirect to DocuSign for the
	// Signing Ceremony. There are multiple ways to save state.
	// To maintain your application's session, use the pingUrl
	// parameter. It causes the DocuSign Signing Ceremony web page
	// (not the DocuSign server) to send pings via AJAX to your
	// app,
	//viewRequest.pingFrequency = 600 // seconds
	// NOTE: The pings will only be sent if the pingUrl is an https address
	//viewRequest.pingUrl = dsPingUrl // optional setting

	return viewRequest
}

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
const signCommande = async (req, res) => {
	try {
		const commandeId = req.params.id

		const commande = await Commande.findOne({ _id: commandeId }).populate(
			'clientID'
		)

		const {
			clientID: { email, first_name, last_name, _id },
		} = commande

		const fullName = `${first_name} ${last_name}`

		const _clientID = _id

		const { access_token } = await getToken()

		const clientID = Date.now()

		// we need to pass the client user ID and name and email
		// we need also to get a new token everytime

		const envelope = makeEnvelope2({
			signerEmail: email,
			signerName: fullName,
			signerClientId: _clientID,
		})

		const dsApiClient = new docusign.ApiClient()

		dsApiClient.setBasePath('https://demo.docusign.net/restapi')

		dsApiClient.addDefaultHeader('Authorization', `Bearer ${access_token}`)

		const envelopesApi = new docusign.EnvelopesApi(dsApiClient)
		let results = null

		results = await envelopesApi.createEnvelope(
			'6ad7c813-9362-46d9-8bc3-db236a546b33',
			{ envelopeDefinition: envelope }
		)

		let envelopeId = results.envelopeId
		console.log(`Envelope was created. EnvelopeId ${envelopeId}`)

		// Step 3. create the recipient view, the embedded signing
		let viewRequest = makeRecipientViewRequest({
			envelopeId: envelopeId,
			dsPingUrl: null,
			dsReturnUrl: `http://localhost:3000/chauffeur/transports/${commandeId}/close`,
			signerClientId: _clientID,
			signerEmail: email,
			signerName: fullName,
		})

		// Call the CreateRecipientView API
		// Exceptions will be caught by the calling function
		results = await envelopesApi.createRecipientView(
			'6ad7c813-9362-46d9-8bc3-db236a546b33',
			envelopeId,
			{
				recipientViewRequest: viewRequest,
			}
		)

		// Save envelopeID in the database
		// Get the document URL so we can displayed in the app when clicked
		// https://demo.docusign.net/restapi/v2.1/accounts/6ad7c813-9362-46d9-8bc3-db236a546b33/envelopes/e57106cc-b31d-4721-b460-50d38e1a0dea/documents/combined
		// we need a new route for the combined pdf with a new token that pipes the resposne to the main response
		// we save envelope ID with the command that has been sigend and set signed as boolean to true
		// when user clicks we pass commandID and query for the envelopeID and call the other api and pipe the pdf response into the client

		await Commande.updateOne(
			{ _id: commandeId },
			{
				statut: 'terminer',
				signed: true,
				envelopeId: envelopeId,
			}
		)

		return res
			.status(200)
			.json({ envelopeId: envelopeId, redirectUrl: results.url })
	} catch (error) {
		handleError(res, error)
	}
}

module.exports = { signCommande }
