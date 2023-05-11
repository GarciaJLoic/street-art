const AbstractManager = require('./AbstractManager')

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: 'utilisateur' })
  }

  userInfos(identification) {
    return this.database.query(
      `SELECT pseudo, nom, prenom,email, avatar, score, privilege_id, id  FROM utilisateur WHERE pseudo=?`,
      [identification.pseudo]
    )
  }

  selectUserByEmail(email) {
    if (email != null) {
      return this.database.query(
        `SELECT pseudo, nom, prenom,email, avatar, score, privilege_id, id  FROM utilisateur WHERE email LIKE ? OR pseudo LIKE ?`,
        [(email += '%'), (email += '%')]
      )
    }
  }

  updateAccess(privilegeAndId) {
    return this.database.query(
      `UPDATE ${this.table} SET privilege_id = ? WHERE email = ?`,
      [privilegeAndId.privilege_id, privilegeAndId.email]
    )
  }

  verifyMdp(identification) {
    return this.database.query(
      `SELECT mdp, pseudo, id, privilege_id FROM utilisateur WHERE pseudo=? OR email=? `,
      [identification.pseudo, identification.email]
    )
  }

  verifyUser(identification) {
    return this.database.query(
      `SELECT pseudo, id, privilege_id FROM utilisateur WHERE pseudo=?`,
      [identification.pseudo]
    )
  }

  signup(newProfile) {
    return this.database.query(
      `INSERT INTO utilisateur (pseudo, nom, prenom, mdp, email, avatar, score, privilege_id) VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [
        newProfile.pseudo,
        newProfile.lastName,
        newProfile.firstName,
        newProfile.hash,
        newProfile.email,
        'bidon',
        '0',
        '1',
      ]
    )
  }

  browseAll() {
    return this.database.query(
      `select id, avatar, pseudo, score from ${this.table} ORDER BY score desc`
    )
  }

  browseAllId() {
    return this.database.query(`select id from ${this.table} `)
  }

  browseScore(id) {
    return this.database.query(
      `select score from  ${this.table} where id = ?`,
      [id]
    )
  }

  updateScore(score, id) {
    return this.database.query(
      `update ${this.table} set score = ? WHERE id = ?`,
      [score, id]
    )
  }
}

module.exports = UtilisateurManager
