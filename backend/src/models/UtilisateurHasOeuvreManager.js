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

  createMap(utilisateurHasOeuvre) {
    // console.log(utilisateur_Has_Oeuvre)
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateur_id, oeuvre_id, mark, decouverte) VALUE ?`,
      [utilisateurHasOeuvre]
    )
  }
}

module.exports = UtilisateurHasOeuvreManager
