const AbstractManager = require('./AbstractManager')

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: 'article' })
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`)
  }

  createArticle(article) {
    return this.database.query(
      `INSERT INTO ${this.table} (titre, date, photo,texte) VALUE (?, ?, ?, ?)`,
      [article.titre, article.date, article.photo, article.texte]
    )
  }
}

module.exports = ArticleManager
