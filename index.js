const express = require('express')
// const movieController = require('./controllers/movies')
// const providerController = require('')
const parser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

app.set('port', process.env.PORT || 4000)

app.use(parser.json())

// app.use('/movie', movieController)
// app.use('/provider', providerController)

const routesMovies = require('./config/routesMovies')
app.use(routesMovies)

const routesProviders = require('./config/routesProviders')
app.use(routesProviders)

app.listen(app.get('port'), () => {
  console.log('Listening on port 4000 (locally)')
})
