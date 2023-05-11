const models = require('../models')

const browse = (req, res) => {
  models.quartier
    .getQuartier()
    .then(([result]) => {
      res.send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browseById = (req, res) => {
  const name = req.params.name

  models.quartier
    .getQuartierByVille(name)
    .then(([result]) => {
      res.send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const browseQuartierByIdVille = (req, res) => {
  const idVille = req.params.id
  models.quartier
    .findQuartierByIdVille(idVille)
    .then(([result]) => {
      res.send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const browseQuartierById = (req, res) => {
  const idQuartier = req.params.id
  models.quartier
    .findQuartierById(idQuartier)
    .then(([result]) => {
      res.send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const ajoutQuartier = (req, res) => {
  const quartierVilleDatas = req.body[0]
  const message = 'Quartier ajouté'
  models.quartier
    .addQuartier(quartierVilleDatas)
    .then(res.status(201).json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const modificationquartier = (req, res) => {
  const quartierDatas = req.body[0]
  const message = 'Quartier modifié'
  models.quartier
    .modifyQuartier(quartierDatas)
    .then(res.status(201).json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const deleteQuartier = (req, res) => {
  const QuartierId = req.params
  const message = 'Quartier supprimé'
  models.quartier
    .deleteQuartierById(QuartierId)
    .then(res.status(201).json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  browseById,
  browseQuartierByIdVille,
  ajoutQuartier,
  browseQuartierById,
  modificationquartier,
  deleteQuartier,
}
