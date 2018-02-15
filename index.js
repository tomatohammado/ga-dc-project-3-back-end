const express = require('express')
const parser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

app.set('port', process.env.PORT || 4000)

app.use(parser.json())

const routesMovies = require('./config/routesMovies')
app.use(routesMovies)

const routesProviders = require('./config/routesProviders')
app.use(routesProviders)

app.listen(app.get('port'), () => {
  console.log('Listening on port 4000 (locally)')
})
