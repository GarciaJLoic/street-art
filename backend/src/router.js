const express = require('express')
const { HashPassword, DeHashPassword } = require('./middleware/PasswordHandler')
const {
  signInTokenCreation,
  checkUser,
  refresh,
  checkCookieJwt,
  requireAuth,
} = require('./middleware/TokenHandler')
const router = express.Router()

const itemControllers = require('./controllers/itemControllers')
const characterController = require('./controllers/characterController')
const houseController = require('./controllers/houseController')
const villeController = require('./controllers/villeController')
const quartierController = require('./controllers/quartierController')
const oeuvreController = require('./controllers/oeuvreController')
const utilisateurController = require('./controllers/utilisateurController')
// route disponible de basse garder les a titre d'exemple
// si on va plus loin  dans la reflextion on peut voir que le fichier itemController.js
// nous fourni des methode que lont peut utiliser " browse, read, edit, add, destroy"

router.get('/items', itemControllers.browse)
router.get('/items/:id', itemControllers.read)
router.put('/items/:id', itemControllers.edit)
router.post('/items', itemControllers.add)
router.delete('/items/:id', itemControllers.destroy)

router.get('/characters', characterController.browse)
router.post('/characters', characterController.add)

router.get('/houses', houseController.browse)
router.post('/houses', houseController.add)

router.get('/villes', villeController.browse)

router.get('/quartiers', quartierController.browse)
// XXXXXXXXXXXXXXXXXXXXXXXXXXX login et Inscription XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
router.post(
  '/login',
  utilisateurController.getUserWithPasswordAndPassToNext,
  DeHashPassword,
  signInTokenCreation
)
router.post('/signup', HashPassword, utilisateurController.createNewProfile)
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX sécurité et routes sécurisées XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
router.get('/jwtId', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user)
})
router.post(
  '/token/refresh',
  checkCookieJwt,
  utilisateurController.getUserWithCookieAndPassToNext,
  refresh
)
router.get('/profiltest', checkUser, utilisateurController.browse)

router.get('/oeuvresformap', oeuvreController.browseForMap)

module.exports = router
