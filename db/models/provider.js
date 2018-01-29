const mongoose = require('../connection')

const ProviderSchema = new mongoose.Schema({
  // TODO
})

// mongoose.model('Provider', ProviderSchema)
const Provider = mongoose.model('Provider', ProviderSchema)

module.exports = Provider
