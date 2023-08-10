const { createSignalement } = require('./createSignalement')
const { deleteSignalement } = require('./deleteSignalement')
const { getSignalements } = require('./getSignalements')
const { updateSignalement } = require('./updateSignalement')
const { getSignalement } = require('./getSignalement')
const {   getSignalementbyChauffeurId} = require('./getSignalementbyChauffeurId')


module.exports = {
    createSignalement,
  deleteSignalement,
  getSignalements,
  updateSignalement,
  getSignalement,
  getSignalementbyChauffeurId
}
