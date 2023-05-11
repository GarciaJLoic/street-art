const models = require('../models')
const browse = (req, res) => {
  models.quartier
    .getQuartier()
    .then(([result]) => {
      res.send(result)
    })
    .catch((err) => {
      console.log.error(err)
      res.sendStatus(500)
    })
}

module.exports = { browse }
