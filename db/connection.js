const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/project-3')

mongoose.Promise = Promise
module.exports = mongoose
