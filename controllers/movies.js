const Movie = require('../db/models/movie')

function getMovies (req, res) {
  Movie.find({})
    .then(movies => {
      res.json(movies)
    })
}
//the create functionality
function postMovies (req, res) {
  Movie.create(req.body.create)
    .then(movies => {
      res.json(movies)
    })
}
//The update functionality
function putMovies (req,res) {
  Movie.update(req.params.id) //more code likely needed
    .then(movies => {
      res.json(movies)
    })
}


function deleteMovies (req, res) {
  Movie.delete(req.body.delete)
    .then(movies => {
      res.json(movies)
    })
}

module.exports = {
  getMovies, postMovies, putMovies, deleteMovies
}
