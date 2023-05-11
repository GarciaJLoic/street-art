const models = require('../models')

const browse = (req, res) => {
  const identification = req.body
  models.utilisateur
    .userInfos(identification)
    .then(([result]) => {
      if (result[0] != null) {
        res.json(result)
      } else {
        res.sendStatus(404)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const getUserWithPasswordAndPassToNext = (req, res, next) => {
  const identification = req.body
  models.utilisateur
    .verifyMdp(identification)
    .then(([utilisateur]) => {
      if (utilisateur[0] != null) {
        req.utilisateur = utilisateur[0]
        next()
      } else {
        res.sendStatus(401)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}

const getUserWithCookieAndPassToNext = (req, res, next) => {
  const identification = req.body
  models.utilisateur
    .verifyUser(identification)
    .then(([utilisateur]) => {
      if (utilisateur[0] != null) {
        req.utilisateur = utilisateur[0]
        next()
      } else {
        res.sendStatus(401).json({ message: 'Unauthorized' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}

const createNewProfile = (req, res) => {
  const newProfile = req.body
  models.utilisateur
    .signup(newProfile)
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("error saving user's datas")
    })
}

module.exports = {
  browse,
  createNewProfile,
  getUserWithPasswordAndPassToNext,
  getUserWithCookieAndPassToNext,
}
