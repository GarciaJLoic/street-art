const AbstractManager = require('./AbstractManager')

class QuartierManager extends AbstractManager {
  constructor() {
    super({ table: 'quartier' })
  }

  getQuartier() {
    return this.database.query(
      `SELECT q.id, q.nom AS q, q.lat, q.lng, v.nom AS ville FROM ${this.table} as q
      INNER JOIN ville as v ON q.ville_id=v.id where q.id > 0
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

  findQuartierByIdVille(idVille) {
    // console.log("findQuartierByIdVille", idVille);
    return this.database.query(
      `SELECT q.id, q.nom AS q, q.lat, q.lng, v.nom AS ville FROM ${this.table} as q
      INNER JOIN ville as v ON q.ville_id=v.id WHERE v.id = ?
      `,
      [idVille]
    )
  }

  findQuartierById(idQuartier) {
    // console.log("findQuartierByIdVille", idVille);
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?
      `,
      [idQuartier]
    )
  }

  addQuartier(quartierVilleDatas) {
    return this.database.query(
      `INSERT INTO ${this.table} (nom, lat, lng, ville_id) VALUES (?, ?, ?, ?)`,
      [
        quartierVilleDatas.nom,
        quartierVilleDatas.lat,
        quartierVilleDatas.lng,
        quartierVilleDatas.ville_id.id,
      ]
    )
  }

  modifyQuartier(quartierDatas) {
    return this.database.query(
      `UPDATE ${this.table} SET nom = ?, lat = ?, lng = ? WHERE id = ?`,
      [
        quartierDatas.nom,
        quartierDatas.lat,
        quartierDatas.lng,
        quartierDatas.id,
      ]
    )
  }

  deleteQuartierById(quartierId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      quartierId.id,
    ])
  }
}

module.exports = QuartierManager
