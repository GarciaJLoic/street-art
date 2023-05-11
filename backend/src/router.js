const express = require('express')

const router = express.Router()

const itemControllers = require('./controllers/itemControllers')
const characterController = require('./controllers/characterController')
const houseController = require('./controllers/houseController')
const villeController = require('./controllers/villeController')
const quartierController = require('./controllers/quartierController')
const oeuvreController = require('./controllers/oeuvreController')
const utilisateurHasOeuvreController = require('./controllers/utilisateurHasOeuvreController')
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

module.exports = router
