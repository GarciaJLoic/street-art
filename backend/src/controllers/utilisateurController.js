const models = require('../models')

const browseAllUser = (req, res) => {
  models.utilisateur
    .browseAll()
    .then(([results]) => {
      res.json(results)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browseAllUser,
}
