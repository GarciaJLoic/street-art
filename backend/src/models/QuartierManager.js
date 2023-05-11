const AbstractManager = require('./AbstractManager')

class QuartierManager extends AbstractManager {
  constructor() {
    super({ table: 'quartier' })
  }

  getQuartier() {
    return this.database.query(
      `SELECT q.id, q.nom AS q, q.lat, q.lng, v.nom AS ville FROM ${this.table} as q
      INNER JOIN ville as v ON q.ville_id=v.id
      `
    )
  }

  getQuartierByVille(name) {
    return this.database.query(
      `SELECT q.id, q.nom AS q, q.lat, q.lng, v.nom AS ville FROM ${this.table} as q
      INNER JOIN ville as v ON q.ville_id=v.id WHERE v.nom = ?
      `,
      [name]
    )
  }
}

module.exports = QuartierManager
