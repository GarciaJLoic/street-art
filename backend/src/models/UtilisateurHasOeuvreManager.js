const AbstractManager = require('./AbstractManager')

class UtilisateurHasOeuvreManager extends AbstractManager {
  constructor() {
    super({ table: 'utilisateur_has_oeuvre' })
  }

  updateDecouverte(oeuvre) {
    return this.database.query(
      `update ${this.table} set decouverte = ? WHERE utilisateur_id = ? AND oeuvre_id = ?`,
      [oeuvre.decouverte, oeuvre.utilisateur_id, oeuvre.oeuvre_id]
    )
  }

  updateFavoris(oeuvre) {
    return this.database.query(
      `update ${this.table} set mark = ? WHERE utilisateur_id = ? AND oeuvre_id = ?`,
      [oeuvre.mark, oeuvre.utilisateur_id, oeuvre.oeuvre_id]
    )
  }
}
module.exports = UtilisateurHasOeuvreManager
