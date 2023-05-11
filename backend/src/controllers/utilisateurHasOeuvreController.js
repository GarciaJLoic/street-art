const models = require('../models')

const updateDecouverteForMap = (req, res) => {
  const utilisateurHasOeuvre = req.body
  models.utilisateurHasOeuvre
    .updateDecouverte(utilisateurHasOeuvre)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const updateFavorisForMap = (req, res) => {
  const utilisateurHasOeuvre = req.body
  models.utilisateurHasOeuvre
    .updateFavoris(utilisateurHasOeuvre)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const createEmptyMap = (req, res) => {
  const utilisateurHasOeuvre = req.utilisateur_has_oeuvre
  models.utilisateurHasOeuvre
    .createMap(utilisateurHasOeuvre)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = { updateDecouverteForMap, updateFavorisForMap, createEmptyMap }
