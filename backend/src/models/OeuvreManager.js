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

  browseOeuvreById(id) {
    return this.database.query(
      `SELECT o.points, o.url_photo, o.lat, o.lng, o.valide, o.quartier_id, q.nom as nomQuartier, q.ville_id, v.nom as nomVille FROM oeuvre as o 
      INNER JOIN quartier as q ON o.quartier_id = q.id
      INNER JOIN ville as v ON q.ville_id = v.id
       where o.id = ?
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
    const data = JSON.parse(oeuvre.data)
    return this.database.query(
      `INSERT INTO ${this.table} (titre, points, url_photo, lat, lng, nb_vu, valide, quartier_id) values (?,?,?,?,?,?,?,?)`,
      [
        oeuvre.titre,
        data.points,
        oeuvre.url_photo,
        data.lat,
        data.lng,
        oeuvre.nb_vu,
        data.valide,
        data.quartierId,
      ]
    )
  }

  updateOeuvre(oeuvre, id) {
    const data = JSON.parse(oeuvre.data)
    return this.database.query(
      `update ${this.table} set titre = ?, points = ?, url_photo = ?, lat = ?, lng = ?, nb_vu = ?, valide = ?, quartier_id = ? WHERE id = ?`,
      [
        oeuvre.titre,
        data.points,
        oeuvre.url_photo,
        data.lat,
        data.lng,
        data.nb_vu,
        data.valide,
        data.quartierId,
        id,
      ]
    )
  }
}
module.exports = OeuvreManager
