const isBannedControl = (req, res, next) => {
  if (
    req.utilisateur.privilege_id === 3 &&
    req.utilisateur.privilege_id !== 9
  ) {
    res.status(403).json('accès restreint')
  } else {
    next()
  }
}

module.exports = { isBannedControl }

// onChange={(e)=> setPrivilege(e.target.value)}
// onChange={accessLevelChange}
