const models = require('../models')

const browseForMap = (req, res) => {
  const id = req.params.id
  models.oeuvre
    .browseAll(id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
module.exports = { browseForMap }
