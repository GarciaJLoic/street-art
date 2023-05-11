const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuth = (req, res, next) => {
  const token = req.signedCookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      res.locals.user = decodedToken.id
      // console.log('requireAuth..token', decodedToken)
      if (err) {
        res.cookie('jwt', '', {
          httpOnly: true,
          sameSite: 'Lax',
          signed: true,
          maxAge: 1,
        })
        return res.status(401).json({ message: 'Unauthorized' })
      } else {
        next()
      }
    })
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// let maxAge = 3 * 24 * 60 * 60 * 1000;
const maxAge = 1 * 1 * 60 * 60 * 1000
//  Tokens creation functions
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  })
}

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '60m',
  })
}

// Account connection: auth token, refresh token generation
const signInTokenCreation = async (req, res) => {
  try {
    const identifiant = req.utilisateur
    const token = createToken(identifiant)
    const accessToken = createAccessToken(identifiant)
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Lax',
      signed: true,
      maxAge,
    })
    res.send({ accessToken, identifiant })
  } catch (err) {
    console.error(err)
  }
}

const checkUser = (req, res, next) => {
  // get the access token from the header
  const authHeader = req.headers.authorization
  const accessToken = authHeader && authHeader.split(' ')[1]
  // const identification = { pseudo: null }
  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' })
  }
  try {
    // verify the access token with the secret key
    // console.log("checkUser......accessToken....", accessToken);
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    )
    // administration ici sur poutes PROTEGEES, condition possibles si ban ou autre, le token contient privilege_id
    // identification.pseudo = decodedToken.id.pseudo
    // req.body = identification
    req.body.pseudo = decodedToken.id.pseudo
    // console.log("checkuser....", req.body.pseudo);

    if (decodedToken) next()
  } catch (err) {
    return res.status(401).json({ message: 'Unrecognized access token' })
  }
}

const checkCookieJwt = (req, res, next) => {
  const identification = { pseudo: null }
  const cookies = req.signedCookies
  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const refreshToken = cookies.jwt

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET)
    identification.pseudo = decodedToken.id.pseudo
    req.body = identification
    // console.log("CHECKCOOKIE......TRY..identification", identification);
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

const refresh = async (req, res, next) => {
  try {
    const utilisateur = req.utilisateur
    const accessToken = createAccessToken(utilisateur)
    res.send({ accessToken })
    next()
  } catch (err) {
    console.error(err)
    return res.status(403).json({ message: 'forbidden' })
  }
}

// deconnexion from account, auth jwtcookie duration validity passed to 1ms
const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    sameSite: 'Lax',
    signed: true,
    maxAge: 1,
  })
  res.redirect('/api')
}

module.exports = {
  signInTokenCreation,
  logout,
  checkUser,
  refresh,
  checkCookieJwt,
  requireAuth,
}
