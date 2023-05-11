const AbstractManager = require('./AbstractManager')

class QuartierManager extends AbstractManager {
  constructor() {
    super({ table: 'quartier' })
  }

  getQuartier() {
    return this.database.query(
      `SELECT q.id, q.nom AS q, q.lat, q.lng, v.nom AS ville FROM quartier as q
      INNER JOIN ville as v ON q.ville_id=v.id
      `
    )
  }
}

module.exports = QuartierManager
