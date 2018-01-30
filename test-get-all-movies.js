const Movie = require('./db/models/movie')
const Provider = require('./db/models/provider')

Provider.find({})
  .then(providers => {
    Movie.find({})
    .then(movies => {
      let moviesResponse = movies.map(movie => {
        let providersInfo = movie.providers.map(providerId => {
          let providerIndex = providers.findIndex(provider => {
            // console.log(`providerId: ${providerId}`)
            // console.log(`provider._id: ${provider._id}`)
            // let providerIdString = JSON.stringify(provider._id)
              // console.log(`providerIdString: ${typeof providerIdString}`)
            // console.log(providerIdString)
              // console.log(`providerId: ${typeof providerId}`)
            // console.log(`provider._id: ${typeof provider._id}`)

            return provider._id == providerId
          })
          return providers[providerIndex]
        })
        movie.providers = providersInfo
        return movie
      })
      // res.json(moviesResponse)
      // console.log(moviesResponse)
    })
  })
