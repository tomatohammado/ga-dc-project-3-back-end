const express = require('express')
const Router = express.Router()

const providerController = require('../controllers/providers')

Router.route('/providers')
  .get(providerController.getProviders)

module.exports = Router
