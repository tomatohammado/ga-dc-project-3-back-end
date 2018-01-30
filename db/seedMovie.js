const Movie = require('./models/movie')
const seedData = require('./movieSeedData.json')

const Provider = require('./models/provider')
let providersData
let newMoviesData
let newProvidersArray
let providerIndex
// console.log(seedData)

Movie.remove({})
  .then(_ => {
    // seed initial data, with providers by name
    Movie.create(seedData).then(_ => {
      Provider.find({})
        .then(providers => {
          // store copy of all Providers (array)
          providersData = providers.slice()

          Movie.find({})
            .then(movies => {
              // create new Movies array to use to reseed...
              newMoviesData = movies.map((movie, i) => {
                // by going through each provider for a movie...
                newProvidersArray = movie.providers.map(provider => {
                  // and for each provider that movie has...
                  providerIndex = providersData.findIndex(element => {
                    return element.name === provider
                  })
                  // if there is no matching provider, return empty string
                  // otherwise, change the provider's value from a name to its matching _id
                  if (providerIndex === -1) return ''
                  return providersData[providerIndex]._id
                })
                movie.providers = newProvidersArray.slice()
                return movie
              })
              // reseed the Movies collection
              Movie.create(newMoviesData)
                .then(_ => {
                  process.exit()
                })
            })
        })
    })
    .catch(err => console.log(err))
  })
