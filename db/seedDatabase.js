const Provider = require('./models/provider')
const Movie = require('./models/movie')
const providersSeed = require('./seedDataProviders.json')
const moviesSeed = require('./seedDataMovies.json')

// 1. Empty the `providers` collection, and reseed it
Provider.remove({})
  .then(_ => {
    Provider.create(providersSeed)
    .then(_ => {
      // 2. then, query the new `providers` collection, and use the generated `_id` fields to replace the provider name strings in the `movies'` seed file
      Provider.find({})
        .then(providers => {
          let providerData = providers.map(obj => Object.assign({}, obj._doc))
          let newMoviesSeed = moviesSeed.map(movie => {
            movie.providers = movie.providers.map(providerString => {
              let providerIndex = providerData.findIndex(providerObj => {
                return providerObj.name === providerString
              })
              return providerData[providerIndex]._id
            })
            return movie
          })

          // 3. Seed the `movies` collection similar to how we seeded the `providers`, but with the new, transformed seed file
          Movie.remove({})
            .then(_ => {
              Movie.create(newMoviesSeed)
                .then(_ => {
                  process.exit()
                })
            })
            .catch(err => console.log(err))
        })
    })
    .catch(err => console.log(err))
  })
