const Provider = require('./models/provider')
const Movie = require('./models/movie')
const providersSeed = require('./seedDataProviders.json')
const moviesSeed = require('./seedDataMovies.json')

const utility = require('../utility')
const transformProvidersArray = utility.transformProvidersArray

// I think you can get away with less nesting/indentation
// I moved a couple things around

// 1. Empty the `providers` collection, and reseed it
Provider
  .remove({})
  .then(_ => Provider.create(providersSeed))
  .catch(err => console.log(err))
  .then(_ => {
    // 2. then, query the new `providers` collection, and use the generated `_id` fields to replace the provider name strings in the `movies'` seed file
    Provider
      .find({})
      .then(providers => {
        let newMoviesSeed = moviesSeed.map(movie => {
          movie.providers = transformProvidersArray(movie.providers, providers)
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
