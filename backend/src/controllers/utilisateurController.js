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

// XXXXXXXXXXXXXXXXXX  administration  XXXXXXXXXXXXXXXXXXXXXXXXX
const selectByEmail = (req, res) => {
  const email = req.body.email
  models.utilisateur
    .selectUserByEmail(email)
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

const updateUserAccess = (req, res) => {
  const privilegeAndId = req.body[0]
  const message = 'Prérogatives modifiées'
  models.utilisateur
    .updateAccess(privilegeAndId)
    .then(res.json(message))
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
const browseAllIdUser = (req, res, next) => {
  models.utilisateur
    .browseAllId()
    .then(([results]) => {
      req.utilisateur_has_oeuvre = results.map((idUser) => [
        idUser.id,
        req.newOeuvre.insertId,
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
const browseScoreById = (req, res) => {
  models.utilisateur
    .browseScore(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
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
      res.sendStatus(500)
    })
}

const updateScoreById = (req, res) => {
  const score = req.body
  const id = req.params.id
  models.utilisateur
    .updateScore(score.score, id)
    .then(([rows]) => {
      res.send(rows)
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

const createNewProfile = (req, res, next) => {
  const newProfile = req.body
  models.utilisateur
    .signup(newProfile)
    .then(([result]) => {
      req.newProfile = result
      next()
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("error saving user's datas")
    })
}

const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    sameSite: 'Lax',
    signed: true,
    maxAge: 1,
  })
  res.redirect('/')
}

module.exports = {
  browse,
  createNewProfile,
  getUserWithPasswordAndPassToNext,
  getUserWithCookieAndPassToNext,
  browseAllUser,
  browseAllIdUser,
  browseScoreById,
  updateScoreById,
  selectByEmail,
  updateUserAccess,
  logout,
}
