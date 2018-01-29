const Provider = require('./models/provider')
const seedData = require('./providerSeedData.json')

// console.log(seedData)

Provider.remove({})
  .then(_ => {
    Provider.create(seedData).then(_ => process.exit())
    .catch(err => console.log(err))
  })
