const { ClientsExistsExcludingItself } = require('./ClientExistsExcludingItself')
const { getAllClientsFromDB } = require('./getAllClientsFromDB')
const { updateClientsInDB } = require('./updateClientInDB')

module.exports = {
    ClientsExistsExcludingItself,
    getAllClientsFromDB,
    updateClientsInDB
    
}