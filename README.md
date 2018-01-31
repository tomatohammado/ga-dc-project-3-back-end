# GADC WDI20 Project 3 Back End: Netflix and Chill

## Technologies

- Express
- MongoDB
- Mongoose
- Body-Parser
- Cors

## Routes

`/movies/`

- [x] GET: returns all movies
- [x] POST: add a new movie to 'movies' collection in the database
  - also updates the appropriate totalMovies fields in the 'providers' collection

`/movies/:id`

- [x] PUT: update a specific movie
- [x] DELETE: delete a specific movie

## MVP Checklist

- [x] implement mongoose populate method in controller
- [x] GET `/movies/:id`
- [ ] CRUD for Providers model
