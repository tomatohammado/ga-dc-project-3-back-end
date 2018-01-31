const Provider = require('./models/provider')
const Movie = require('./models/movie')
const seedDataProvider = require('./providerSeedData.json')
const seedDataMovie = require('./movieSeedData.json')

Provider.remove({})
  .then(_ => {
    Provider.create(seedDataProvider)
    .then(_ => {
      Provider.find({})
        .then(providers => {
          let providerData = providers.map(obj => Object.assign({}, obj._doc))
          // let newSeedDataMovie = seedDataMovie.map(obj => Object.assign({}, obj))
          let newSeedDataMovie = seedDataMovie.map(movie => {
            movie.providers = movie.providers.map(providerString => {
              let providerIndex = providerData.findIndex(providerObj => {
                return providerObj.name === providerString
              })
              return providerData[providerIndex]._id
            })
            return movie
          })

          Movie.remove({})
            .then(_ => {
              Movie.create(newSeedDataMovie)
                .then(_ => {
                  process.exit()
                })
            })
            .catch(err => console.log(err))
        })
    })
    .catch(err => console.log(err))
  })
