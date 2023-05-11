const AbstractManager = require('./AbstractManager')

class OeuvreManager extends AbstractManager {
  constructor() {
    super({ table: 'oeuvre' })
  }

  browseAll(id) {
    return this.database.query(
      `SELECT uho.utilisateur_id, uho.oeuvre_id , uho.mark, uho.decouverte, uho.decouverte, o.lat, o.lng, o.url_photo, o.points   
      FROM ${this.table} as o
      INNER JOIN utilisateur_has_oeuvre as uho ON o.id=uho.oeuvre_id
      INNER JOIN utilisateur as u ON u.id=uho.utilisateur_id
      WHERE uho.utilisateur_id = ?
      `,
      [id]
    )
  }

  browseAllId() {
    return this.database.query(`SELECT id FROM ${this.table}`)
  }
}
module.exports = OeuvreManager
