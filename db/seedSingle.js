const Provider = require('./models/provider')
const seedDataProvider = require('./providerSeedData.json')
const Movie = require('./models/movie')
const seedDataMovie = require('./movieSeedData.json')

Provider.remove({})
  .then(_ => {
    Provider.create(seedDataProvider)
    // .then(_ => process.exit())
    // .catch(err => console.log(err))
    .then(_ => {
      Provider.find({})
        .then(providers => {
          let providerData = providers.map(obj => Object.assign({}, obj._doc))
          // console.log(seedDataMovie)
          let newSeedDataMovie = seedDataMovie.map(obj => Object.assign({}, obj))
        })
    })
  })
