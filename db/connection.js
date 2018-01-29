const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/project-3')

const mongoUri = 'mongodb://localhost/project-3'

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MLAB_URL, { useMongoClient: true })
} else {
  mongoose.connect(mongoUri, { useMongoClient: true })
    .then(connection => console.log(`connection established to db ${connection.db.databaseName}`))
    .catch(error => console.log('Connection Failed!', error))
}

mongoose.Promise = Promise
module.exports = mongoose
