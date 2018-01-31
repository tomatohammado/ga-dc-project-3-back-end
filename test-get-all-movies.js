const Movie = require('./db/models/movie')
const Provider = require('./db/models/provider')

let providerIndex
let newProviders
let newMovies
Movie.find({})
  .then(movies => {
    // console.log(movies)
    Provider.find({})
      .then(providersAll => {
        // console.log(providers)
        newMovies = movies.map(movie => {
          // console.log(movie)
          // console.log(movie.providers)
          newProviders = movie.providers.map(provider => {
            // console.log(provider)
            providerIndex = providersAll.findIndex(element => {
              // console.log(element._id)
              return element._id == provider
            })
            // console.log(providerIndex)
            // console.log(providersAll[providerIndex])
            return providersAll[providerIndex]
          })
          // console.log(newProviders)

          // newProviders = newProviders.map(obj => {
          //   // console.log(obj)
          //   // console.log(JSON.parse(JSON.stringify(obj)))
          //   if (obj == null) return
          //   console.log(JSON.stringify(obj))
          //   // Object.assign({}, obj._doc)
          // })
          // console.log(newProviders)
          // console.log(typeof newProviders[0])
          // console.log(newProviders[0])

          console.log(movie)
          // movie.providers = newProviders
          // console.log(movie)
        })
      })
  })
