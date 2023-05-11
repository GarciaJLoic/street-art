const AbstractManager = require('./AbstractManager')

class OeuvreManager extends AbstractManager {
  constructor() {
    super({ table: 'oeuvre' })
  }

  browseAll() {
    return this.database.query(
      `SELECT o.valide, o.lat, o.lng,  q.nom, o.points FROM oeuvre as o
      INNER JOIN quartier as q ON o.quartier_id=q.id;
      `
    )
  }
}
module.exports = OeuvreManager
