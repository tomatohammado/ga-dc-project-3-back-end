const Movie = require('./db/models/movie')
const Provider = require('./db/models/provider')

function postMovie (req) {
  // Movie.create(req.body)
  //   .then(movie => res.json(movie))

  Provider.find({})
    .then(providers => {
      let providerData = providers.map(obj => Object.assign({}, obj._doc))
      let newMovie = Object.assign({}, req.body)
      newMovie.providers = newMovie.providers.map(providerString => {
        let providerIndex = providerData.findIndex(providerObj => {
          return providerObj.name === providerString
        })
        return providerData[providerIndex]._id
      })
      Movie.create(newMovie)
        // .then(movie => res.json(movie))
        .then(movie => console.log(movie))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

postMovie({
  body: {
    'name': 'Test-Post',
    'year': 1999,
    'providers': [
      'YouTube',
      'Amazon'
    ]
  }
})
