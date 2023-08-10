const { getAllTransporters } = require('./getAllTransporters')
const { createTransporter } = require('./createTransporter')
const { deleteTransporter } = require('./deleteTransporter')
const { getTransporter } = require('./getTransporter')
const { updateTransporter } = require('./updateTransporter')
const { suspendTransporter } = require('./suspendTransporter')
const { findTransporter } = require('./findTransporter')
const { getAllNewTransporter } = require('./getAllNewTransporter')
const { updateTransporterStatus } = require('./updateTransporterStatus')

module.exports = {
    getAllTransporters,
    createTransporter,
    deleteTransporter,
    getTransporter,
    updateTransporter,
    suspendTransporter,
    findTransporter,
    getAllNewTransporter,
    updateTransporterStatus

}
