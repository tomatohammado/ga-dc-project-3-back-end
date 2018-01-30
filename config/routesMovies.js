const express = require('express')
const Router = express.Router()

const movieController = require('../controllers/movies')

Router.route('/movies')
  .get(movieController.getMovies)
  .post(movieController.postMovies)

// Router.route('/movies/:id')
//   .put(movieController.putMovies)
//   .delete(movieController.deleteMovies)

module.exports = Router
