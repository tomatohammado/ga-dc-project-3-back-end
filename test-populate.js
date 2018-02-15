// I might move this into a test folder, as well


const Provider = require('./db/models/provider')
const Movie = require('./db/models/movie')

// Provider
//   .find({})
//   .then(providers => {
//     // console.log(typeof providers[0]._id)
//     console.log(providers)
//     let providerData = providers.map(obj => Object.assign({}, obj._doc))
//     console.log(providerData)
//     // console.log(typeof providerData[0]._id)
//   })

// Provider
//   .findOne({name: 'YouTube'})
//   .then(provider => {
//     console.log(typeof provider._id)
//   })

const seedDataMovie = require('./db/movieSeedData.json')
// // console.log(seedDataMovie)
// let newSeedDataMovie = seedDataMovie.map(obj => Object.assign({}, obj))
// // console.log(newSeedDataMovie)

Provider.find({})
  .then(providers => {
    let providerData = providers.map(obj => Object.assign({}, obj._doc))
    // console.log(providerData)
    let newSeedDataMovie = seedDataMovie.map(obj => Object.assign({}, obj))
    // console.log(newSeedDataMovie)
    newSeedDataMovie = newSeedDataMovie.map(movie => {
      movie.providers = movie.providers.map(provider => {
        let providerIndex = providerData.findIndex(element => {
          return element.name === provider
        })
        // console.log(typeof providerData[providerIndex]._id)

        // Alternate method for establishing 'type' in JavaScript
        // console.log(providerData[providerIndex]._id.constructor)
        return providerData[providerIndex]._id
      })
      return movie
    })
    // console.log(newSeedDataMovie)
    // You might want to chain a promise method on the query above and place the code below in a callback to the promise method, since its execution depends on a value 'calculated' above, `newSeedDataMovie`
    Movie.remove({})
      .then(_ => {

        Movie.create(newSeedDataMovie)
          .then(_ => {
            // console.log(movies)
            // process.exit()
            Movie.find({})
              .populate('providers')
              .exec((err, movies) => {
                if (err) console.log(err)
                console.log(movies)
              })
          })
      })
  })
