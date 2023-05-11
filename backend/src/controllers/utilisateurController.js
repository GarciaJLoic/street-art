const models = require('../models')

const browse = (req, res) => {
  const identification = req.body
  models.utilisateur
    .userInfos(identification)
    .then(([result]) => {
      if (result[0] != null) {
        // administration ici sur route LOGIN, condition possibles si ban ou autre, le token contient privilege_id
        // console.log("utilisateurController.....browse..resultat", result);
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
const getUserWithPasswordAndPassToNext = (req, res, next) => {
  const identification = req.body
  models.utilisateur
    .verifyMdp(identification)
    .then(([utilisateur]) => {
      // console.log("getUserWithPasswordAndPassToNext.....data..utilisateur", utilisateur);
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

// const createNewProfile = (req, res,) => {
const createNewProfile = (req, res, next) => {
  const newProfile = req.body
  models.utilisateur
    .signup(newProfile)
    .then(([result]) => {
      // res.location(`/account/${result.insertId}`).sendStatus(201)
      req.newProfile = result
      next()
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
  browseAllUser,
}
