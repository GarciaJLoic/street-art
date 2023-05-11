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
    .findAll()
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
const selectOeuvreByID = (req, res) => {
  // CHANGE ATTENTION //
  models.oeuvre
    .find(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const selectOeuvresByVille = (req, res) => {
  models.oeuvre
    .browseAllByVille(req.params.name)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const selectOeuvresByQuartier = (req, res) => {
  models.oeuvre
    .browseAllByQuartier(req.params.name)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const createOeuvre = (req, res) => {
  const oeuvre = req.body
  oeuvre.titre = 'null'
  oeuvre.valide = 1
  models.oeuvre
    .addOeuvre(oeuvre)
    .then(([result]) => {
      res.status(201).send(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const updateOeuvreById = (req, res) => {
  const oeuvre = req.body
  const id = req.params.id
  models.oeuvre
    .updateOeuvre(oeuvre, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.status(204).send(result)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}
const deleteOeuvreById = (req, res) => {
  models.oeuvre
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}
module.exports = {
  browseForMap,
  selectAlloeuvres,
  selectAllIdOeuvres,
  selectOeuvresByVille,
  selectOeuvresByQuartier,
  createOeuvre,
  selectOeuvreByID,
  updateOeuvreById,
  deleteOeuvreById,
}
