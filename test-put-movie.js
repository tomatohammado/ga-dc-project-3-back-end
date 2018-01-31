const Movie = require('./db/models/movie')

function putMovie (req) {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(movie => {
      console.log(movie)
    })
}

let test = {
  params: {
    id: '5a70beec0734969a815180a4'
  },
  body: {
    'providers': [
      ''
    ],
    'name': 'Black Panther (Updated 2)'
  }
}

putMovie(test)
