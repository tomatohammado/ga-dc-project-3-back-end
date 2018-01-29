const mongoose = require('../connection')

const MovieSchema = new mongoose.Schema({
  // TODO
})

// mongoose.model('Movie', MovieSchema)
const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
