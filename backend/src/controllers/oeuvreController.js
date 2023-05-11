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
const selectAlloeuvres = (req, res) => {
  models.oeuvre
    .findALL()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const selectAllIdOeuvres = (req, res, next) => {
  models.oeuvre
    .browseAllId()
    .then(([idOeuvres]) => {
      req.utilisateur_has_oeuvre = idOeuvres.map((idOeuvre) => [
        req.newProfile.insertId,
        idOeuvre.id,
        0,
        0,
      ])
      next()
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = { browseForMap, selectAlloeuvres, selectAllIdOeuvres }
