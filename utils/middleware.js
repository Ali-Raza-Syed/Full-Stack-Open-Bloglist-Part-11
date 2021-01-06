const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message 
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  logger.error(error.message)

  next(error)
}

const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = authorization && authorization.toLowerCase().startsWith('bearer ') ? 
    authorization.substring(7): 
    null
  next()
}

module.exports = {errorHandler, getTokenFrom}