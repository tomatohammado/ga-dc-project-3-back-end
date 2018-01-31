const express = require('express')
const Router = express.Router()

const movieController = require('../controllers/movies')

Router.route('/movies')
  .get(movieController.getMovies)
  .post(movieController.postMovie)

Router.route('/movies/:id')
  .get(movieController.getMovie)
  .put(movieController.putMovie)
  .delete(movieController.deleteMovie)

module.exports = Router
