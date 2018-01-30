const Movie = require('./db/models/movie')
const Provider = require('./db/models/provider')

function postMovies (obj) {
  let newMovie = Object.assign({}, obj.body)
  let rawProviders = newMovie.providers
  let cleanedProviders = rawProviders.replace(/\s+/g, '').split(',')
  let providersData
  let providerIndex
  let transformedProviders
  Provider.find({})
    .then(providers => {
      providersData = providers.slice()
      // console.log('providersData')
      // console.log(providersData)
      transformedProviders = cleanedProviders.map(provider => {
        providerIndex = providersData.findIndex(element => {
          return element.name === provider
        })
        // if there is no matching provider, return empty string
        // otherwise: change the provider's value from a name to its matching _id
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
            .then(_ => process.exit())
        })
    })

  // Provider.update({$or: [...newMovie.providers]}, {$inc: {totalMovies: 1}})
  //   .then(_ => {
  //     Movie.create(newMovie)
  //     // .then(_ => {
  //     //   Movie.find({})
  //     //     .then(movies => {
  //     //       res.json(movies)
  //     //     })
  //     // })
  //   })

  // Movie.create(req.body)
  //   .then(movies => {
  //     res.json(movies)
  //   })
}

postMovies({
  body: {
    'name': 'test-test-1',
    'year': 1999,
    'providers': 'Netflix, iTunes'
  }
})
