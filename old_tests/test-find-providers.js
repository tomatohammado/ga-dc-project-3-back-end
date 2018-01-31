// const Movie = require('./db/models/movie')
const Provider = require('./db/models/provider')

Provider.update({
  '_id': {$in: [
    '5a707fbe2df0697cc4006296',
    '5a707fbe2df0697cc400629d'
  ]}},
  {$inc: {totalMovies: 1}},
  {multi: true})
  .then(providers => console.log(providers))
