const express = require('express')
const router = express.Router()

const queries = require('../db/queries')

// *** GET all shows *** //
router.get('/shows', function(req, res, next) {
  queries.getAll()
    .then(function(shows) {
      res.status(200).json(shows)
    })
    .catch(function(error) {
      next(error)
    })
})

router.get('/shows/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
    .then(function(shows) {
      res.status(200).json(shows)
    })
    .catch(function(error) {
      next(error)
    })
})

// *** add show *** //
router.post('/shows', function(req, res, next) {
  queries.add(req.body)
    .then(function(showID) {
      return queries.getSingle(showID)
    })
    .then(function(show) {
      res.status(200).json(show)
    })
    .catch(function(error) {
      next(error)
    })
})

module.exports = router
