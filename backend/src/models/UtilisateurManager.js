const AbstractManager = require('./AbstractManager')

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: 'utilisateur' })
  }

  userInfos(identification) {
    return this.database.query(
      `SELECT pseudo, nom, prenom,email, avatar, score, privilege_id  FROM utilisateur WHERE pseudo=? OR email=? `,
      [identification.pseudo, identification.email]
    )
  }

  verifyMdp(identification) {
    return this.database.query(
      `SELECT mdp, pseudo FROM utilisateur WHERE pseudo=? OR email=? `,
      // `SELECT mdp FROM utilisateur WHERE pseudo=? OR email=? `,
      [identification.pseudo, identification.email]
    )
  }

  verifyUser(identification) {
    return this.database.query(
      `SELECT pseudo FROM utilisateur WHERE pseudo=? OR email=? `,
      [identification.pseudo, identification.email]
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
}

module.exports = UtilisateurManager
