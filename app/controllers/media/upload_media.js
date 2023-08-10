const Media = require('../../models/media')
let sanitize = require("sanitize-filename");
/**
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const uploadMedia = async (req, res) => {

  console.log(req.files)
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      })
    } else {
      const file = req.files.file
      let fileName = `${Date.now()}_${sanitize(file.name)}` ;
      console.log(process.env.PWD)

      file.mv(`${process.env.PWD}/public/media/${fileName}`)

      const media = await Media.create({
        name: fileName,
        mimetype: file.mimetype,
        size: file.size
      })

      console.log(media)

      // send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          id: media._id,
          name: media.name,
          mimetype: media.mimetype,
          size: media.size
        }
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { uploadMedia }
