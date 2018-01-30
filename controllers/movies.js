import { puts } from 'util'

const Movie = require('../db/models/movie')

function getMovies (req, res) {
  Movie.find({})
    .then(movies => {
      res.json(movies)
    })
}

function postMovie (req, res) {
  Movie.create(req.body.create)
    .then(movies => {
      res.json(movies)
    })
}

function putMovie (req,res) {
  Movie.update(req.params.id)
}


puts

delete

module.exports = {
  getMovies, get
}
