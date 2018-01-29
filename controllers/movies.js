const Movie = require('../db/models/movie')

function getMovies (req, res) {
  Movie.find({})
    .then(movies => {
      res.json(movies)
    })
}

module.exports = {
  getMovies
}
