const mongoose = require('../connection')

const MovieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  providers: [String]
})

// mongoose.model('Movie', MovieSchema)
const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
