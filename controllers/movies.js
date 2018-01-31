const Movie = require('../db/models/movie')
// const Provider = require('../db/models/provider')

function getMovies (req, res) {
  Movie.find({})
    .populate('providers')
    .exec((err, movies) => {
      if (err) console.log(err)
      res.json(movies)
    })
}

function postMovie (req, res) {
  Movie.create(req.body)
    .then(movie => res.json(movie))
}

function putMovie (req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(movie => {
      res.json(movie)
    })
}

function deleteMovie (req, res) {
  Movie.findByIdAndRemove(req.params.id)
    .then(_ => {
      Movie.find({})
        .then(movies => res.json(movies))
    })
}

module.exports = {
  getMovies,
  postMovie,
  putMovie,
  deleteMovie
}
