const models = require('../models')

const browse = (req, res) => {
  models.ville
    .findAll()
    .then(([result]) => {
      // console.log(result)
      res.send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browseById = (req, res) => {
  const villeId = req.params
  models.ville
    .findById(villeId)
    .then(([result]) => {
      res.send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browseForAdmin = (req, res) => {
  models.ville
    .findAllAdmin()
    .then(([result]) => {
      // console.log(result)
      res.send(result)
    })
    .catch((err) => {
      console.log.error(err)
      res.sendStatus(500)
    })
}

const ajoutVille = (req, res) => {
  const villeDatas = req.body[0]
  const message = 'Ville ajoutée'
  models.ville
    .addVille(villeDatas)
    .then(res.status(201).json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const modificationVille = (req, res) => {
  const villeDatas = req.body[0]
  const message = 'Ville modifiée'
  models.ville
    .modifyVille(villeDatas)
    .then(res.status(201).json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const deleteVille = (req, res) => {
  const villeId = req.params
  const message = 'Ville supprimée'
  models.ville
    .deleteVilleById(villeId)
    .then(res.status(201).json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  ajoutVille,
  browseById,
  deleteVille,
  modificationVille,
  browseForAdmin,
}
