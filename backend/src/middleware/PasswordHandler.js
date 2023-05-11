const argon2 = require('argon2')

const HashPassword = async (req, res, next) => {
  const passwordTOHash = req.body.password
  const hash = await argon2.hash(passwordTOHash, { hashLength: 40 })
  req.body.hash = hash
  delete req.body.password
  next()
}

const DeHashPassword = async (req, res, next) => {
  const decoding = await argon2.verify(req.utilisateur.mdp, req.body.password)
  try {
    delete req.body.password
    delete req.utilisateur.mdp
    decoding ? next() : res.sendStatus(403)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

module.exports = {
  HashPassword,
  DeHashPassword,
}
