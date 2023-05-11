const models = require('../models')

const browse = (req, res) => {
  models.article
    .findAll()
    .then(([results]) => {
      if (results[0] != null) {
        res.render('index', { articles: results })
      } else {
        res.sendStatus(404)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const newArticle = (req, res) => {
  let date = new Date()
  date = date.toLocaleDateString()
  const article = {
    titre: req.body.titre,
    date,
    photo: req.body.photo,
    texte: req.body.texte,
  }
  models.article
    .createArticle(article)
    .then(() => {
      res.status(200).redirect('/articles')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('error saving new article')
    })
}

module.exports = {
  browse,
  newArticle,
}
