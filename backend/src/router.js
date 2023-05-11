const express = require('express')
const { HashPassword, DeHashPassword } = require('./middleware/PasswordHandler')
const {
  ValidateUserSignUp,
  ValidateUserLogin,
} = require('./middleware/verifyFrontForms')

// UPLOAD PHOTO
const fs = require('fs')

const multer = require('multer')

const router = express.Router()

const upload = multer({ dest: './public/uploads/' })

const { v4: uuidv4 } = require('uuid')

// route POST pour recevoir un fichier
router.post('/api/avatar', upload.single('avatar'), (req, res) => {
  // On récupère le nom du fichier
  const { originalname } = req.file
  // On récupère le nom du fichier
  const { filename } = req.file
  // On utilise la fonction rename de fs pour renommer le fichier
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err

      res.send('File uploaded')
    }
  )
})

const {
  signInTokenCreation,
  checkUser,
  refresh,
  checkCookieJwt,
  requireAuth,
} = require('./middleware/TokenHandler')

const villeController = require('./controllers/villeController')
const quartierController = require('./controllers/quartierController')
const oeuvreController = require('./controllers/oeuvreController')
const utilisateurHasOeuvreController = require('./controllers/utilisateurHasOeuvreController')
const utilisateurController = require('./controllers/utilisateurController')

// route disponible de basse garder les a titre d'exemple
// si on va plus loin  dans la reflextion on peut voir que le fichier itemController.js
// nous fourni des methode que lont peut utiliser " browse, read, edit, add, destroy"

router.get('/villes', villeController.browse)

router.get('/quartiers', quartierController.browse)
// dessous route pour futur utilisateur: toutes les oeuvres
router.get('/oeuvresfornewuser', oeuvreController.selectAlloeuvres)
router.get('/oeuvresformap/:id', oeuvreController.browseForMap)
router.put(
  '/oeuvresformap/decouverte',
  utilisateurHasOeuvreController.updateDecouverteForMap
)
router.put(
  '/oeuvresformap/favoris',
  utilisateurHasOeuvreController.updateFavorisForMap
)
router.get('/utilisateur', utilisateurController.browseAllUser)

// XXXXXXXXXXXXXXXXXXXXXXXXXXX  login et Inscription  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
router.post(
  '/login',
  ValidateUserLogin,
  utilisateurController.getUserWithPasswordAndPassToNext,
  DeHashPassword,
  signInTokenCreation
)

router.post(
  '/signup',
  ValidateUserSignUp,
  HashPassword,
  utilisateurController.createNewProfile,
  oeuvreController.selectAllIdOeuvres,
  utilisateurHasOeuvreController.createEmptyMap
)
// router.post('/signup', HashPassword, utilisateurController.createNewProfile)

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  sécurité  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
router.get('/jwtId', requireAuth, (req, res) => {
  // console.log("jwtid..................", res.locals.user);
  res.status(200).send(res.locals.user)
})

router.post(
  '/token/refresh',
  checkCookieJwt,
  utilisateurController.getUserWithCookieAndPassToNext,
  refresh
)

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  routes sécurisées  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
router.get('/account', checkUser, utilisateurController.browse)
router.get('/explore', checkUser, utilisateurController.browse)
router.post('/utilisateur/find', checkUser, utilisateurController.selectByEmail)

router.get('/oeuvresformap', oeuvreController.browseForMap)
router.get('/oeuvresformap/:id', oeuvreController.browseForMap)
router.put(
  '/oeuvresformap/decouverte',
  utilisateurHasOeuvreController.updateDecouverteForMap
)
router.put(
  '/oeuvresformap/favoris',
  utilisateurHasOeuvreController.updateFavorisForMap
)
router.get('/utilisateur', utilisateurController.browseAllUser)
router.get('/utilisateur/:id/score', utilisateurController.browseScoreById)
router.put('/utilisateur/:id/score', utilisateurController.updateScoreById)

module.exports = router
