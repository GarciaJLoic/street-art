const models = require('../models')

const browseForMap = (req, res) => {
  models.oeuvre
    .browseAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = { browseForMap }
