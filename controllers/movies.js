const Movie = require('../db/models/movie')
const Provider = require('../db/models/provider')

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
      let newMovie = req.body.map(movie => {
        movie.providers = movie.providers.map(providerString => {
          let providerIndex = providerData.findIndex(providerObj => {
            return providerObj.name === providerString
          })
          return providerData[providerIndex]._id
        })
        return movie
      })
      Movie.create(newMovie)
        .then(movie => res.json(movie))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

//
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
