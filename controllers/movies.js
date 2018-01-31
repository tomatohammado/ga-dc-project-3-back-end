const Movie = require('../db/models/movie')
const Provider = require('../db/models/provider')

function getMovies (req, res) {
  Movie.find({})
    .then(movies => {
      res.json(movies)
    })
}
// the create functionality
function postMovie (req, res) {
  let newMovie = Object.assign({}, req.body)
  let rawProviders = newMovie.providers
  let cleanedProviders = rawProviders.split(',').map(provider => provider.trim())
  let providersData
  let providerIndex
  let transformedProviders
  Provider.find({})
    .then(providers => {
      providersData = providers.slice()
      transformedProviders = cleanedProviders.map(provider => {
        providerIndex = providersData.findIndex(element => {
          return element.name === provider
        })
        if (providerIndex === -1) return ''
        else {
          ++providersData[providerIndex].totalMovies
          return providersData[providerIndex]._id
        }
      })
      newMovie.providers = transformedProviders.slice()
      console.log(newMovie.providers)

      Provider.update({
        '_id': {$in: newMovie.providers}},
        {$inc: {totalMovies: 1}},
        {multi: true})
        .then(_ => {
          Movie.create(newMovie)
            .then(_ => {
              Movie.find({})
                .then(movies => res.json(movies))
            })
        })
    })
}

// The update functionality
function putMovie (req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(movie => {
      res.json(movie)
    })
}

// function deleteMovies (req, res) {
//   Movie.delete(req.body.delete)
//     .then(movies => {
//       res.json(movies)
//     })
// }

module.exports = {
  getMovies,
  postMovie,
  putMovie
  // deleteMovies
}
