const mongoose = require('../connection')

const MovieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  providers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
  }]
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
