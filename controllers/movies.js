const Movie = require('../db/models/movie')
const Provider = require('../db/models/provider')

/* I think I can get away with calling this at the end of each other method, to return all of the movies... */
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
      let providerData = providers.map(obj => Object.assign({}, obj._doc))
      let newMovie = Object.assign({}, req.body.data)
      newMovie.providers = newMovie.providers.map(providerString => {
        let providerIndex = providerData.findIndex(providerObj => {
          return providerObj.name === providerString
        })
        return providerData[providerIndex]._id
      })
      Movie.create(newMovie)
        .then(_ => getMovies(req, res))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function putMovie (req, res) {
  Provider.find({})
    .then(providers => {
      let providerData = providers.map(obj => Object.assign({}, obj._doc))
      let updateMovie = Object.assign({}, req.body.data)
      updateMovie.providers = updateMovie.providers.map(providerString => {
        let providerIndex = providerData.findIndex(providerObj => {
          return providerObj.name === providerString
        })
        return providerData[providerIndex]._id
      })
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
