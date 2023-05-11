const AbstractManager = require('./AbstractManager')

class VilleManager extends AbstractManager {
  constructor() {
    super({ table: 'ville' })
  }

  addVille(villeDatas) {
    return this.database.query(
      `INSERT INTO ville (nom, lat, lng) VALUES (?, ?, ?)`,
      [villeDatas.nom, villeDatas.lat, villeDatas.lng]
    )
  }

  findAllAdmin() {
    return this.database.query(`select * from  ${this.table}`)
  }

  findById(villeId) {
    return this.database.query(`SELECT * FROM ville WHERE id = ?`, [villeId.id])
  }

  modifyVille(villeDatas) {
    return this.database.query(
      `UPDATE ${this.table} SET nom = ?, lat = ?, lng = ? WHERE id = ?`,
      [villeDatas.nom, villeDatas.lat, villeDatas.lng, villeDatas.id]
    )
  }

  deleteVilleById(villeId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      villeId.id,
    ])
  }
}

module.exports = VilleManager
