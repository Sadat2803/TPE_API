/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
	return new Promise((resolve) => {
		let user = {
			_id: req._id,
			__id: req.id,
			first_name: req.first_name,
			last_name: req.last_name,
			email: req.email,
			password: req.password,
			city: req.city,
			country: req.country,

			role: req.role,
			societe: req.societe,
			siret: req.siret,
			quality: req.quality,
			city: req.city,
			postalCode: req.postalCode,

			kbis: req.kbis,
			logo: req.logo,

			suspendre: req.suspendre,
			verified: req.verified,

			premium: req.premium,
			reduction: req.reduction,

			status: req.status,
		}

		if (process.env.NODE_ENV !== 'production') {
			user = {
				...user,
				verification: req.verification,
			}
		}
		resolve(user)
	})
}

module.exports = { setUserInfo }
