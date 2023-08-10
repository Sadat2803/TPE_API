const { createTarif } = require('./createTarif')
const { getTarif } = require('./getTarif')
const { payTarif, payTarifMobile } = require('./payTarif')

module.exports = {
	createTarif,
	getTarif,
	payTarif,
	payTarifMobile
}
