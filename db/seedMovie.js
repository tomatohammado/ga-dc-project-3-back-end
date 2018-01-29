const Movie = require('./models/movie')
const seedData = require('./movieSeedData.json')

// console.log(seedData)

Movie.remove({})
  .then(_ => {
    Movie.create(seedData).then(_ => process.exit())
    .catch(err => console.log(err))
  })
