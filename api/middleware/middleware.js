function logger(req, res, next) {
  const time = new Date().toLocaleString()
  console.log(time, req.method, req.originalUrl, )
  next()
}

function validateUserId(req, res, next) {
  console.log('scaffolding log')
  next()
  
}

function validateUser(req, res, next) {
  console.log('scaffolding log')
  next()
  
}

function validatePost(req, res, next) {
  console.log('scaffolding log')
  next()
  
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}