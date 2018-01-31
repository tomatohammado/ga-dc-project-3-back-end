const Movie = require('../db/models/movie')
const Provider = require('../db/models/provider')

const utility = require('../utility')
const transformProvidersArray = utility.transformProvidersArray

function getMovies (req, res) {
  Movie.find({})
    .populate('providers')
    .exec((err, movies) => {
      if (err) console.log(err)
      res.json(movies)
    })
}

/* I think, currently, I'm working under the assumption that:
// 1. for POST and PUT, the `providers` propery in the payload will be in the form of an array of strings corresponding to provider names, similar to the seed file
// - thus, I will need similar code to transform the array from the String name references to the corresponding ObjectId values.
// 2. the payload will actually be in `req.body.data`, not `req.body`
*/
function postMovie (req, res) {
  // Movie.create(req.body)
  //   .then(movie => res.json(movie))

  Provider.find({})
    .then(providers => {
      let newMovie = Object.assign({}, req.body.data)
      newMovie.providers = transformProvidersArray(newMovie.providers, providers)
      Movie.create(newMovie)
        .then(_ => getMovies(req, res))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function putMovie (req, res) {
  Provider.find({})
    .then(providers => {
      let updateMovie = Object.assign({}, req.body.data)
      updateMovie.providers = transformProvidersArray(updateMovie.providers, providers)
      Movie.findByIdAndUpdate(req.params.id, updateMovie, { new: true })
        .then(_ => getMovies(req, res))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function deleteMovie (req, res) {
  Movie.findByIdAndRemove(req.params.id)
    .then(_ => getMovies(req, res))
    .catch(err => console.log(err))
}

module.exports = {
  getMovies,
  postMovie,
  putMovie,
  deleteMovie
}
