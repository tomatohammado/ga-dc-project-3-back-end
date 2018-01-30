const getSingleMovie = require('../getSingleMovie')

function getOneMovie (req, res) {
    Movie
    .findOne({'_id': req.params.id})
    .then(movie => {
        res.json(movie)
    })
}

export default getSingleMovie
