const mongoose = require('../connection')

const ProviderSchema = new mongoose.Schema({
  name: String
})

// mongoose.model('Provider', ProviderSchema)
const Provider = mongoose.model('Provider', ProviderSchema)

module.exports = Provider
