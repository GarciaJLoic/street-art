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
      WHERE uho.utilisateur_id = ? AND o.valide = 1
      `,
      [id]
    )
  }

  browseAllByVille(name) {
    return this.database.query(
      `SELECT o.*
      FROM ${this.table} as o
      INNER JOIN quartier as q ON q.id=o.quartier_id
      INNER JOIN ville as v ON v.id=q.ville_id
      WHERE v.nom = ?
      `,
      [name]
    )
  }

  browseAllByQuartier(name) {
    return this.database.query(
      `SELECT o.*
      FROM ${this.table} as o
      INNER JOIN quartier as q ON q.id=o.quartier_id
      INNER JOIN ville as v ON v.id=q.ville_id
      WHERE q.nom = ?
      `,
      [name]
    )
  }

  browseAllId() {
    return this.database.query(`SELECT id FROM ${this.table}`)
  }

  addOeuvre(oeuvre) {
    return this.database.query(
      `INSERT INTO ${this.table} (titre, points, url_photo, lat, lng, nb_vu, valide, quartier_id) values (?,?,?,?,?,?,?,?)`,
      [
        oeuvre.titre,
        oeuvre.points,
        oeuvre.url_photo,
        oeuvre.lat,
        oeuvre.lng,
        oeuvre.nb_vu,
        oeuvre.valide,
        oeuvre.quartier_id,
      ]
    )
  }

  updateOeuvre(oeuvre, id) {
    return this.database.query(
      `update ${this.table} set titre = ?, points = ?, url_photo = ?, lat = ?, lng = ?, nb_vu = ?, valide = ?, quartier_id = ? WHERE id = ?`,
      [
        oeuvre.titre,
        oeuvre.points,
        oeuvre.url_photo,
        oeuvre.lat,
        oeuvre.lng,
        oeuvre.nb_vu,
        oeuvre.valide,
        oeuvre.quartier_id,
        id,
      ]
    )
  }
}
module.exports = OeuvreManager
