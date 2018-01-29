const Provider = require('../db/models/provider')

function getProviders (req, res) {
  Provider.find({})
    .then(providers => {
      res.json(providers)
    })
}

module.exports = {
  getProviders
}
