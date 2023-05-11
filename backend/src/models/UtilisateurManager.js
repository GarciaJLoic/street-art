const AbstractManager = require('./AbstractManager')

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: 'utilisateur' })
  }

  browseAll() {
    return this.database.query(
      `select id, avatar, pseudo, score from ${this.table}`
    )
  }
}

module.exports = UtilisateurManager
