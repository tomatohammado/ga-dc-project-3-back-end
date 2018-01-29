const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/project-3', { useMongoClient: true })

mongoose.Promise = Promise
module.exports = mongoose
