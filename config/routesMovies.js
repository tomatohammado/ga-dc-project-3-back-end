const express = require('express')
const Router = express.Router()

const movieController = require('../controllers/movies')

Router.route('/movies')
  .get(movieController.getMovies)

module.exports = Router
