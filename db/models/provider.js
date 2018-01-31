const mongoose = require('../connection')

const ProviderSchema = new mongoose.Schema({
  name: String
})

const Provider = mongoose.model('Provider', ProviderSchema)

module.exports = Provider
