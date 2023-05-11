const AbstractManager = require('./AbstractManager')

class VilleManager extends AbstractManager {
  constructor() {
    super({ table: 'ville' })
  }
}

module.exports = VilleManager
