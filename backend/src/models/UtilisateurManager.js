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
      // `SELECT pseudo, id FROM utilisateur WHERE pseudo=? OR pseudo=? OR email=? `,
      // [identification.pseudo, identification.email]
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
      `select id, avatar, pseudo, score from ${this.table}`
    )
  }
}

module.exports = UtilisateurManager
